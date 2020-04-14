import React from 'react';
import Chip from '@material-ui/core/Chip';


export default function Chips(props) {

    return (
        <Chip
            size="small"

            label={props.text}

        />

    );
}