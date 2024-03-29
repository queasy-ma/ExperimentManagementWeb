import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';


function AddExperimentContentDialog({ open, onClose, handleConfirm, experiments }) {
    const [details, setDetails] = useState('');
    const [experimentId, setExperimentId] = useState('');

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>增加实验内容</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="dense" variant="standard">
                    <InputLabel id="experiment-select-label">选择实验</InputLabel>
                    <Select
                        labelId="experiment-select-label"
                        id="experiment-select"
                        value={experimentId}
                        onChange={(e) => setExperimentId(e.target.value)}
                        label="选择实验"
                    >
                        {experiments.map((experiment) => (
                            <MenuItem key={experiment.id} value={experiment.id}>
                                {experiment.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    autoFocus
                    margin="dense"
                    id="details"
                    label="实验内容详情"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    variant="standard"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>取消</Button>
                <Button onClick={() => handleConfirm(details, experimentId)}>确认</Button>
            </DialogActions>
        </Dialog>
    );
}


export default AddExperimentContentDialog;