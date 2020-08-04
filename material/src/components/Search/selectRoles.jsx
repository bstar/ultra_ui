
import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { roleMap } from 'utils';


export default class SelectRoles extends React.Component {

    render () {
  
        const { onChange, role } = this.props;
        const roles = Object.keys(roleMap);
    
        return (
            <SelectField
              name="role"
              autoWidth={false}
              floatingLabelText="Role"
              style={{ width: '250px', top: '-10px' }}
              value={role}
              onChange={onChange}
            >
            <MenuItem value={null} primaryText="" />
                { roles.map(role => <MenuItem value={role} primaryText={role} /> )}
            </SelectField>
        );
    }
};
