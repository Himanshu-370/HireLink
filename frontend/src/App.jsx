import React, { useEffect, useState } from "react";
import {
  Box,
  ThemeProvider,
  CssBaseline,
  Grid,
  CircularProgress,
  Button,
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
  where,
} from "firebase/firestore";
import { Close as CloseIcon } from "@mui/icons-material";
import ViewJobModal from "./components/Job/ViewJobModal";

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customSearch, setCustomSearch] = useState(false);
  const [newJobModal, setNewJobModal] = useState(false);
  const [viewJob, setViewJob] = useState({});

  const fetchJobs = async () => {
    setCustomSearch(false);
    setLoading(true);
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

  const fetchJobsCustom = async (jobSearch) => {
    setLoading(true);
    setCustomSearch(true);
    const jobsCollection = collection(firestoredb, "jobs");
    const jobsQuery = query(
      jobsCollection,
      where("location", "==", jobSearch.location),
      where("type", "==", jobSearch.type),
      orderBy("postedOn", "desc")
    );
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
        <ViewJobModal job={viewJob} closeModal={setViewJob({})} />
        <Box mb={3}>
          <Grid container justifyContent="center">
            <Grid item xs={10}>
              <SearchBar fetchJobsCustom={fetchJobsCustom} />
              {loading ? (
                <Box display="flex" justifyContent="center">
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  {customSearch && (
                    <Box my={2} display="flex" justifyContent="flex-end">
                      <Button onClick={fetchJobs}>
                        <CloseIcon size={20} />
                        Custom Search
                      </Button>
                    </Box>
                  )}
                  {jobs.map((job) => {
                    return (
                      <JobCard
                        open={() => setViewJob()}
                        key={job.id}
                        {...job}
                      />
                    );
                  })}
                </>
              )}
            </Grid>
          </Grid>
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
