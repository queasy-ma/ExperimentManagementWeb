import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';


function AddExperimentDialog({ open, onClose, handleConfirm, courses }) {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [courseId, setCourseId] = useState('');

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>增加实验</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="dense">
                    <InputLabel id="course-select-label">课程</InputLabel>
                    <Select
                        labelId="course-select-label"
                        id="course-select"
                        value={courseId}
                        label="课程"
                        onChange={(e) => setCourseId(e.target.value)}
                        variant="standard"
                    >
                        {courses.map((course) => (
                            <MenuItem key={course.id} value={course.id}>
                                {course.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="实验标题"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="type"
                    label="实验类型"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>取消</Button>
                <Button onClick={() => handleConfirm(title, type, courseId)}>确认</Button>
            </DialogActions>
        </Dialog>
    );
}


export default AddExperimentDialog;