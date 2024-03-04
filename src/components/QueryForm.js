// ProjectSubmission.js
import React, { useState } from "react";
import { useAuth } from "../auth/userProvider/AuthProvider";
import { ArrowRightCircle } from "react-bootstrap-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Container,

  Grid,

} from "@mui/material";

import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";


const QueryForm = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [projectData, setProjectData] = useState({
    name: "",
    email: "",
    college: "",
    about: "",
    goals: "",
    dob: "",

    skills: [],
    instagram: "",
    linkedIn: "",
    address: "",
    // New field for storing documentation URL
  });
  const [wordCount, setWordCount] = useState({
    description: 0,
  });

  const [wordCountDescription, setWordCountDescription] = useState(0);
  const [wordCountGoals, setWordCountGoals] = useState(0);
  const [wordCountProcess, setWordCountProcess] = useState(0);
  const [submissionDate, setSubmissionDate] = useState("");
  const WORD_LIMIT_DESCRIPTION_GOALS = 100;
  const WORD_LIMIT_PROCESS = 200;

  // Create storage reference for documentation files
  // Create storage reference for documentation files
  // const counterStyle = {
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   width: "200px",
  //   height: "80px",
  //   border: "2px solid #333",
  //   borderRadius: "8px",
  //   fontSize: "2rem",
  //   fontFamily: "monospace",
  //   backgroundColor: "#f0f0f0",
  //   color: "#333",
  // };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    handleChange("dob", date); // Assuming handleChange is a function to update the state
  };
  const handleTextChange = (field, value, wordLimit) => {
    const words = value.split(/\s+/);

    switch (field) {
      case "about":
        if (words.length <= wordLimit) {
          setProjectData((prevData) => ({
            ...prevData,
            [field]: value,
          }));
          setWordCountDescription(words.length);
        }
        break;

      case "goals":
        if (words.length <= wordLimit) {
          setProjectData((prevData) => ({
            ...prevData,
            [field]: value,
          }));
          setWordCountGoals(words.length);
        }
        break;

      case "process":
        if (words.length <= wordLimit) {
          setProjectData((prevData) => ({
            ...prevData,
            [field]: value,
          }));
          setWordCountProcess(words.length);
        }
        break;

      default:
        break;
    }
  };

  const handleOpen = () => {
    setOpen(true);
    setWordCount({
      description: 0,
    });
  };

  const handleClose = () => {
    setOpen(false);
    setProjectData({
      name: "",
      email: "",
      college: "",
      about: "",
      goals: "",
      dob: "",
  
      skills: [],
      instagram: "",
      linkedIn: "",
      address: "",
    });
  };

  const handleChange = (field, value) => {
    setProjectData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleFeatureChange = (index, value) => {
    setProjectData((prevData) => {
      const updatedFeatures = [...prevData.features];
      updatedFeatures[index] = value;
      return {
        ...prevData,
        features: updatedFeatures,
      };
    });
  };

  const handleAddFeature = () => {
    setProjectData((prevData) => ({
      ...prevData,
      features: [...prevData.features, ""],
    }));
  };

  const handleSkillChange = (index, value) => {
    setProjectData((prevData) => {
      const updatedSkills = [...prevData.skills];
      updatedSkills[index] = value;
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
  };

  const handleAddSkill = () => {
    setProjectData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, ""],
    }));
  };

  const handleSubmit = async () => {
    try {
      const db = firestore;
      const currentDate = new Date();
      const formattedDate = format(currentDate, "dd-MMM-yyyy");
      const flattenedProjectData = {
        ...projectData,

       
        skills: Array.isArray(projectData.skills)
          ? projectData.skills
          : projectData.skills.split(",").map((skill) => skill.trim()),
      };

      const userDocRef = doc(collection(db, "form"));
      const userDocSnapshot = await getDoc(userDocRef);
      const userBranch = userDocSnapshot.data()?.branch;

      const projectWithBranch = { ...flattenedProjectData };
      const projectWithBranchAndDate = {
        ...flattenedProjectData,
       
        submittedOn: formattedDate, // Add the submission date
      };
      await addDoc(collection(db, "form"), projectWithBranchAndDate);

      console.log(
        "Data successfully submitted to Firebase:",
        projectWithBranchAndDate
      );
      toast.success("Thank you!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      handleClose();
      setProjectData({
        name: "",
        email: "",
        college: "",
        about: "",
        goals: "",
        dob: "",
    
        skills: [],
        instagram: "",
        linkedIn: "",
        address: "",
      });
    } catch (error) {
      console.error("Error submitting data to Firebase:", error);
      toast.error("Error submitting project. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      handleClose();
      setProjectData({
        name: "",
        email: "",
        college: "",
        about: "",
        goals: "",
        dob: "",
    
        skills: [],
        instagram: "",
        linkedIn: "",
        address: "",
      });
    }
  };

  return (
    <Container>
      <button onClick={handleOpen}>
        Let’s Connect <ArrowRightCircle size={25} />
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tell us about yourself</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ padding: "10px" }}>
            <DialogContent>
              <Grid container spacing={2} style={{ padding: "10px" }}>
              <Grid item xs={12}>
  <TextField
    label="Name"
    variant="outlined"
    fullWidth
    value={projectData.name}
    onChange={(e) => handleChange("name", e.target.value)}
    required  // Add the 'required' attribute

  />
</Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={projectData.projectName}
                    required
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="College/University"
                    variant="outlined"
                    fullWidth
                    required
                    value={projectData.projectName}
                    onChange={(e) => handleChange("college", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="About"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={projectData.description}
                    onChange={(e) =>
                      handleTextChange(
                        "about",
                        e.target.value,
                        WORD_LIMIT_DESCRIPTION_GOALS
                      )
                    }
                  />

                  <Typography
                    variant="caption"
                    color={
                      wordCountDescription > WORD_LIMIT_DESCRIPTION_GOALS
                        ? "error"
                        : "textSecondary"
                    }
                  >
                    {`${
                      wordCountDescription || 0
                    } words / ${WORD_LIMIT_DESCRIPTION_GOALS} words limit`}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Goals"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={projectData.goals}
                    onChange={(e) =>
                      handleTextChange(
                        "goals",
                        e.target.value,
                        WORD_LIMIT_DESCRIPTION_GOALS
                      )
                    }
                  />

                  <Typography
                    variant="caption"
                    color={
                      wordCountGoals > WORD_LIMIT_DESCRIPTION_GOALS
                        ? "error"
                        : "textSecondary"
                    }
                  >
                    {`${
                      wordCountGoals || 0
                    } words / ${WORD_LIMIT_DESCRIPTION_GOALS} words limit`}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6">Date of Birth</Typography>
                  <DatePicker
                
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy" // Customize date format if needed
                    isClearable
                    required
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={15} // Number of years shown in the dropdown
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Skills
                  </Typography>
                  {projectData.skills.map((skill, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                      <TextField
                        label={`Skill ${index + 1}`}
                        variant="outlined"
                        fullWidth
                        value={skill}
                        onChange={(e) =>
                          handleSkillChange(index, e.target.value)
                        }
                      />
                    </div>
                  ))}
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleAddSkill}
                  >
                    + Add Skill
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Links
                  </Typography>
                  {/* Link to the App */}
                  <TextField
                    style={{ marginBottom: "10px" }}
                    label="Instagram"
                    variant="outlined"
                    fullWidth
                    value={projectData.instagram || ""}
                    onChange={(e) => handleChange("instagram", e.target.value)}
                  />
                  {/* Link to linkedIn */}
                  <TextField
                    label="linkedIn"
                    variant="outlined"
                    fullWidth
                    value={projectData.linkedIn || ""}
                    onChange={(e) => handleChange("linkedIn", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Address
                  </Typography>
                  <TextField
                    label="Address"
                    variant="outlined"
                    fullWidth
                    multiline
                    required
                    rows={4}
                    value={projectData.description}
                    onChange={(e) =>
                      handleTextChange("address", e.target.value)
                    }
                  />
                </Grid>
              </Grid>
            </DialogContent>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{ color: "#333", marginRight: "8px" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ backgroundColor: "#28a745", color: "#fff" }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    <ToastContainer/>
    </Container>
  );
};

export default QueryForm;
