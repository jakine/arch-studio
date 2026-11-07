import React from 'react';
import CountUp from './CountUp';

const StatItem = React.memo(({ value, play, format, label }) => (
  <div className="stat-item">
    <p className="stat-number"><CountUp value={value} play={play} format={format} /></p>
    <p className="stat-label">{label}</p>
  </div>
));

StatItem.displayName = 'StatItem';

export default StatItem;
