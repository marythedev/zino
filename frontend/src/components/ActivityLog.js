const ActivityLog = ({ logs }) => {
	return (
		<div className="admin-activity-log">
			<h3>Activity Log</h3>
			<ul>
				{logs.slice().reverse().map((log, index) => (
					<li key={index} className="log-item">
						<strong>{log.username || 'Unknown'}</strong>: {log.message} <em>({new Date(log.timestamp).toLocaleString()})</em>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ActivityLog;