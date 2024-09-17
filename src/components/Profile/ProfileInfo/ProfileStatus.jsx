import React, { Component } from 'react'

export default class ProfileStatus extends Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    onStatusChange(e)
    {
        this.setState({status: e.currentTarget.value});
    }

    activateEditMode()
    {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode()
    {
        this.setState({
            editMode: false,
        });
        this.props.updateStatus(this.state.status);
    }

    componentDidUpdate(prevProps, prevState){
        if (this.props.status != prevProps.status)
        {
            this.setState({status: this.props.status});
        }
    }

  render() {
    return (
      <div>
        {
            !this.state.editMode &&
            <div>
                <span onDoubleClick={this.activateEditMode.bind(this)}>{this.state.status || "------"}</span>
            </div>
        }
        {
            this.state.editMode && 
            <div>
                <input onChange={this.onStatusChange.bind(this)} autoFocus onBlur={this.deactivateEditMode.bind(this)} type="text" value={this.state.status} />
            </div>
        }
      </div>
    )
  }
}
