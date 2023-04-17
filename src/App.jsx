import React, { useEffect, useState } from "react";
import {
  Box,
  ThemeProvider,
  CssBaseline,
  Grid,
  CircularProgress,
  Button,
  Typography,
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
  deleteDoc,
  doc,
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
      where("locationDetails", "==", jobSearch.locationDetails),
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
      locationDetails: "",
      postedOn: serverTimestamp(),
    });
    fetchJobs();
  };

  const deleteJob = async (jobId) => {
    try {
      const jobRef = doc(firestoredb, "jobs", jobId);
      await deleteDoc(jobRef);
      console.log(`Job with ID ${jobId} has been deleted`);
      fetchJobs();
    } catch (error) {
      console.error(`Error deleting job with ID ${jobId}:`, error);
    }
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
        <ViewJobModal job={viewJob} closeModal={() => setViewJob({})} />
        <Box mb={3}>
          <Grid
            container
            justifyContent="center"
            style={{ backgroundColor: "#ecf0f5" }}
          >
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
                  {jobs.length > 0 ? (
                    jobs.map((job) => (
                      <JobCard
                        open={() => setViewJob(job)}
                        deleteJob={deleteJob}
                        key={job.id}
                        {...job}
                      />
                    ))
                  ) : (
                    <Box my={3} display="flex" justifyContent="center">
                      <Typography variant="h6">No jobs found</Typography>
                    </Box>
                  )}
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
