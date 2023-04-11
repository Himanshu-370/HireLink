import React, { useEffect, useState } from "react";
import {
  Box,
  ThemeProvider,
  CssBaseline,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import theme from "./theme/theme";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/searchBar";
import JobCard from "./components/Job/JobCard";
import NewJobModal from "./components/Job/NewJobModal";
import { firestoredb } from "./firebase/config";
import {
  collection,
  query,
  orderBy,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newJobModal, setNewJobModal] = useState(false);

  const fetchJobs = async () => {
    const jobsCollection = collection(firestoredb, "jobs");
    const jobsQuery = query(jobsCollection, orderBy("postedOn", "desc"));
    const querySnapshot = await getDocs(jobsQuery);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      postedOn: doc.data().postedOn.toDate(),
    }));
    setJobs(data);
    setLoading(false);
  };

  const postJob = async (jobDetails) => {
    await addDoc(collection(firestoredb, "jobs"), {
      ...jobDetails,
      postedOn: serverTimestamp(),
    });
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Header openNewJobModal={() => setNewJobModal(true)} />
        <NewJobModal
          closeModal={() => setNewJobModal(false)}
          newJobModal={newJobModal}
          postJob={postJob}
        />
        <Grid container justifyContent="center">
          <Grid item xs={10}>
            <SearchBar />
            {loading ? (
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            ) : (
              jobs.map((job) => {
                return <JobCard key={job.id} {...job} />;
              })
            )}
          </Grid>
        </Grid>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
