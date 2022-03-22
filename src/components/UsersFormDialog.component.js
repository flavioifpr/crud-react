//React imports
import React from 'react';
//Form imports
import {useForm} from "react-hook-form";
//Material UI imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const UsersFormDialog = (props) => {
    const {register, handleSubmit, errors} = useForm();

    const onSubmit = data => {
        props.handleSubmit(data);
    };

    return (
        <Dialog fullWidth={true} open={props.open} onClose={props.handleClose}>
            <DialogTitle id="form-dialog-title">Add/Edit user </DialogTitle>
            <DialogContent>   
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    inputRef={register({required: true})}
                    name="id"
                    autoFocus
                    margin="dense"
                    id="id"
                    label="Id"
                    type="text"
                    fullWidth
                    defaultValue={props.selected.id}
                    disabled={!!props.selected.id}                         
                />
                <TextField
                    inputRef={register({required: true})}
                    name="name"
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth    
                    defaultValue={props.selected.name}                   
                />                
                <TextField
                    inputRef={register({required: true})}
                    name="email"
                    margin="dense"
                    id="email"
                    label="Email"
                    type="text"
                    fullWidth      
                    defaultValue={props.selected.email}                 
                />                
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button type="submit" color="primary">
                    Submit
                </Button>                
            </form>             
            </DialogContent>
        </Dialog>
    );
};

export default UsersFormDialog;
