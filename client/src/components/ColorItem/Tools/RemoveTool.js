import styles from './RemoveTool.css';
import PropTypes from 'prop-types';
import React from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { removeColor } from 'redux/actions/likedColors';
import getInterfaceAttributes from 'utils/getInterfaceAttributes';

const RemoveTool = ({ onClick, color, isOnlyItem }) => {
  const interfaceAttributes = getInterfaceAttributes(color.hexCode);

  if (isOnlyItem) {
    return null;
  }

  return (
    <svg
      styleName={interfaceAttributes.className}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 408.483 408.483"
    >
      <g>
        <path
          fill={interfaceAttributes.color}
          d="M87.748 388.784c.46 11.01 9.52 19.7 20.54 19.7h191.91c11.018 0 20.078-8.69 20.54-19.7L334.44 99.468h-260.4L87.75 388.784zM247.655 171.33c0-4.61 3.738-8.35 8.35-8.35h13.355c4.61 0 8.35 3.738 8.35 8.35V336.62c0 4.61-3.738 8.35-8.35 8.35h-13.355c-4.61 0-8.35-3.737-8.35-8.35V171.33zm-58.44 0c0-4.61 3.74-8.35 8.35-8.35h13.355c4.61 0 8.35 3.738 8.35 8.35V336.62c0 4.61-3.738 8.35-8.35 8.35h-13.355c-4.61 0-8.35-3.737-8.35-8.35V171.33zm-58.44 0c0-4.61 3.738-8.35 8.35-8.35h13.355c4.61 0 8.35 3.738 8.35 8.35V336.62c0 4.61-3.74 8.35-8.35 8.35h-13.356c-4.61 0-8.35-3.737-8.35-8.35V171.33zM343.567 21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.97c-2.378 0-4.305 1.928-4.305 4.305v16.737H64.916c-7.125 0-12.9 5.776-12.9 12.9V74.47h304.45V33.944c0-7.125-5.774-12.9-12.9-12.9z"
        />
      </g>
    </svg>
  );
};

RemoveTool.propTypes = {
  color: PropTypes.object.isRequired,
  isOnlyItem: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    isOnlyItem: state.likedColors.length === 1,
  };
};

const mapDispatchToProps = (dispatch, { color }) => {
  return {
    onClick: () => dispatch(removeColor(color)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CSSModules(RemoveTool, styles)
);
