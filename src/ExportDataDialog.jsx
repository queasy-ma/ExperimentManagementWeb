import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, FormControlLabel, FormGroup, FormControl, FormLabel, RadioGroup, Radio } from '@mui/material';

const ExportDataDialog = ({ open, onClose, data, onExport }) => {
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [selectedExperiments, setSelectedExperiments] = useState([]);
    const [exportType, setExportType] = useState('pdf');

    const handleToggleCourse = (courseId) => {
        // Toggle logic for course selection
        const currentIndex = selectedCourses.indexOf(courseId);
        const newSelectedCourses = [...selectedCourses];

        if (currentIndex === -1) {
            newSelectedCourses.push(courseId);
            // Add all experiments of this course to selectedExperiments
            const experimentsToAdd = data.courses.find(course => course.id === courseId).experiments.map(exp => exp.id);
            setSelectedExperiments(prev => [...new Set([...prev, ...experimentsToAdd])]);
        } else {
            newSelectedCourses.splice(currentIndex, 1);
            // Remove all experiments of this course from selectedExperiments
            const experimentsToRemove = data.courses.find(course => course.id === courseId).experiments.map(exp => exp.id);
            setSelectedExperiments(prev => prev.filter(expId => !experimentsToRemove.includes(expId)));
        }

        setSelectedCourses(newSelectedCourses);
    };

    const handleToggleExperiment = (experimentId) => {
        // Toggle logic for experiment selection
        const currentIndex = selectedExperiments.indexOf(experimentId);
        const newSelectedExperiments = [...selectedExperiments];

        if (currentIndex === -1) {
            newSelectedExperiments.push(experimentId);
        } else {
            newSelectedExperiments.splice(currentIndex, 1);
        }

        setSelectedExperiments(newSelectedExperiments);
    };

    const handleExport = () => {
        onExport(selectedCourses, selectedExperiments, exportType);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>导出数据</DialogTitle>
            <DialogContent>
                <FormControl>
                    <FormLabel>导出类型</FormLabel>
                    <RadioGroup row value={exportType} onChange={(e) => setExportType(e.target.value)}>
                        <FormControlLabel value="pdf" control={<Radio />} label="PDF" />
                        <FormControlLabel value="excel" control={<Radio />} label="Excel" />
                    </RadioGroup>
                </FormControl>
                {/* Checkbox list for courses and experiments */}
                {data && data.courses.map((course) => (
                    <FormGroup key={course.id}>
                        <FormControlLabel
                            control={<Checkbox checked={selectedCourses.includes(course.id)} onChange={() => handleToggleCourse(course.id)} />}
                            label={course.name}
                        />
                        {course.experiments.map((experiment) => (
                            <FormControlLabel
                                key={experiment.id}
                                control={<Checkbox checked={selectedExperiments.includes(experiment.id)} onChange={() => handleToggleExperiment(experiment.id)} />}
                                label={`实验: ${experiment.title}`}
                                style={{ marginLeft: '20px' }}
                            />
                        ))}
                    </FormGroup>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>取消</Button>
                <Button onClick={handleExport}>导出</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ExportDataDialog;
