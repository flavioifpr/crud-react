//React imports
import React, {useEffect, useState} from "react";
import {createUser, getAllUsers, removeUser, updateUser} from "../services/users-http.service";
import UsersFormDialog from "./UsersFormDialog.component";
import {UsersTable} from "./UsersTable.component";
import {AlertBar} from "./AlertBar.component";
import Button from "@material-ui/core/Button";

const UsersList = () => {
    const [rows, setRows] = useState([]);
    const [alertMeta, setAlertMeta] = useState({severity: '', message: ''});
    const [isUsersListManipulated, setUsersListManipulated] = useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isAlertOpen, setAlertOpen] = useState(false);
    const [selected, setSelected] = useState({id: '', name: '', email: ''});    
 
    useEffect(() => {
        getAllUsers().then(res => setRows(res.data));
    }, []);

    useEffect(() => {
        if (isUsersListManipulated) {
            getAllUsers().then(res => setRows(res.data));
        }
        setUsersListManipulated(false);
    }, [isUsersListManipulated]);    

    const add = (data) => {
        createUser(data)
            .then(() => {
                showAlert("success", "Create success");
                closeDialog();
            })
            .catch(() => showAlert("error", "Create failed"));
    };

    const showAlert = (severity, message) => {
        setUsersListManipulated(true);
        setAlertMeta({severity, message});
        setAlertOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setSelected({id: '', name: '', email: ''});
    };

    const edit = (data) => {
        data.id = selected.id;
        console.log('data=' + JSON.stringify(data));
        updateUser(data.id, data)
            .then(() => {
                showAlert("success", "Update success");
                closeDialog();
            })
            .catch(() => { showAlert("error", "Update failed"); console.log('data=' + data); });
    };

    const remove = (row) => {
        removeUser(row.id)
            .then(() => showAlert("success", "Delete success"))
            .catch(() => showAlert("error", "Delete failed"));
    };

    const openCreateDialog = () => {
        openUsersFormDialog({id: '', name: '', email: ''});
    };

    const openEditDialog = (row) => {
        openUsersFormDialog(row);
    };

    const openUsersFormDialog = (row) => {
        setDialogOpen(true);
        setSelected(row);
    };

    const handleSubmit = (user) => {
        if (selected.id) {
            console.log('user=' + JSON.stringify(user));
            edit(user);
        } else {
            add(user);
        }
    };    

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };

    return (
        <div>
            <AlertBar open={isAlertOpen} onClose={handleAlertClose} alertMeta={alertMeta}/>
            <Button variant="outlined" color="primary" onClick={openCreateDialog}>Add new</Button>
            <UsersFormDialog open={isDialogOpen} handleClose={closeDialog} handleSubmit={handleSubmit}
                               selected={selected}/>
            <UsersTable rows={rows} onDelete={remove} openEditModal={openEditDialog}/>
        </div>
    );
};

export default UsersList;