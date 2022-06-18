import React, { FormEvent, useState } from 'react';
import CreateButton from './Create';
import CreateModal from '../SessionModal';
import { TabData } from 'shared/types/Tab';

interface props {
    save: (title: string, checked: boolean, tabs: TabData[][]) => void;
}

export default function SessionManager(props: props) {
    const [isOpen, setOpen] = useState(false);

    const addHandler = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    const submitNewSession = (
        title: string,
        checked: boolean,
        tabs: TabData[][]
    ) => {
        props.save(title, checked, tabs);
        setOpen(false);
    };

    return (
        <React.Fragment>
            <CreateButton autoFocus={true} onClick={addHandler}></CreateButton>
            <CreateModal
                isOpen={isOpen}
                closeModal={closeModal}
                save={submitNewSession}
            ></CreateModal>
        </React.Fragment>
    );
}
