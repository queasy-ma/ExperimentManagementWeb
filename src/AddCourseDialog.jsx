import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

function AddCourseDialog({ open, onClose, handleConfirm }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>增加课程</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="课程名称"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="description"
                    label="课程描述"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    variant="standard"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>取消</Button>
                <Button onClick={() => handleConfirm(name, description)}>确认</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddCourseDialog;
