import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { counts } from "../utils/data";
import CountsCard from "../components/cards/CountsCard";
import WeeklyStatCard from "../components/cards/WeeklyStatCard";
import CategoryChart from "../components/cards/CategoryChart";
import AddWorkout from "../components/AddWorkout";
import WorkoutCard from "../components/cards/WorkoutCard";
import { addWorkout, getDashboardDetails, getWorkouts } from "../api";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: auto;
`;
const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Title = styled.div`
  padding: 0px 16px;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;
const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

function parseWorkoutInput(input) {
  const lines = input.split("\n").map(l => l.trim()).filter(Boolean);

  return {
    category: lines[0]?.replace("#", "").trim(),
    workoutName: lines[1]?.replace("-", "").trim(),
    sets: parseInt(lines[2]?.match(/\d+/)?.[0] || 0, 10),
    reps: parseInt(lines[2]?.match(/x\s*(\d+)/)?.[1] || 0, 10), // safer regex
    weight: parseInt(lines[3]?.match(/\d+/)?.[0] || 0, 10),
    duration: parseInt(lines[4]?.match(/\d+/)?.[0] || 0, 10),
  };
}


const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [data, setData] = useState(null);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [workout, setWorkout] = useState(`#Legs
- Back Squat
- 5 sets x 15 reps
- 30 kg
- 10 min`);

  const dashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("fitnessTrack-app-token");
      const res = await getDashboardDetails(token);
      setData(res?.data || {});
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getTodaysWorkout = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("fitnessTrack-app-token");
      const res = await getWorkouts(token, "");
      setTodaysWorkouts(res?.data?.todaysWorkouts || []);
    } catch (err) {
      console.error("Workout fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const addNewWorkout = async () => {
  try {
    setButtonLoading(true);
    const token = localStorage.getItem("fitnessTrack-app-token");
    const parsed = parseWorkoutInput(workout);
    await addWorkout(token, parsed); // send structured object
    await Promise.all([dashboardData(), getTodaysWorkout()]);
    setWorkout(""); // clear input after saving
  } catch (err) {
    alert(err.response?.data?.message || "Failed to add workout");
  } finally {
    setButtonLoading(false);
  }
};

  useEffect(() => {
    dashboardData();
    getTodaysWorkout();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>Dashboard</Title>

        {loading && <div style={{ textAlign: "center" }}>Loading...</div>}

        <FlexWrap>
          {counts.map((item, idx) => (
            <CountsCard key={idx} item={item} data={data} />
          ))}
        </FlexWrap>

        <FlexWrap>
          <WeeklyStatCard data={data} />
          <CategoryChart data={data} />
          <AddWorkout
            workout={workout}
            setWorkout={setWorkout}
            addNewWorkout={addNewWorkout}
            buttonLoading={buttonLoading}
          />
        </FlexWrap>

        <Section>
          <Title>Today's Workouts</Title>
          <CardWrapper>
            {todaysWorkouts.length > 0 ? (
              todaysWorkouts.map((workout, idx) => (
                <WorkoutCard key={idx} workout={workout} />
              ))
            ) : (
              <div>No workouts added yet.</div>
            )}
          </CardWrapper>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
