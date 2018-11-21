import React, {Component} from 'react'
import PropTypes from 'prop-types'

const proptypes = {
    title: PropTypes.string,
    onDelete: PropTypes.func.isRequired
}

class Assignment extends Component {

    onDelete = () => {
        const { title, onDelete } = this.props;
        console.log("tile  of assignment " + title);
        onDelete(title);
    }

    render(){
        const { title } = this.props;

        return(
            <div>
                <span>{title}</span>
                {` `}
                <button onClick={this.onDelete}>Delete</button>  
            </div>
        );
    };
}

Assignment.propTypes = proptypes;

export default Assignment;