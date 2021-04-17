import * as React from 'react';
import './SidebarWidget.scss';

const SidebarWidget: React.FC = (props) => (
  <div className="sidebar-widget-wrapper">
    <div className="sidebar-widget__header">
      <h3 className="title">{props.title}</h3>
      {props.header}
    </div>
    <div className="sidebar-widget__body">{props.children}</div>
  </div>
);

export default SidebarWidget;
