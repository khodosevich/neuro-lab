import { Typography, Box, Paper, useTheme, Stack, Chip, Tooltip, IconButton } from '@mui/material';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Area, ComposedChart, ReferenceLine, Label } from 'recharts';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RefreshIcon from '@mui/icons-material/Refresh';

interface TrainingTimeProps {
	trainingTimeData: Array<{
		name: string;
		time: number;
		[key: string]: any;
	}>;
	onRefresh?: () => void;
	title: string;
}

const ModelTrainingTime = ({ trainingTimeData, onRefresh, title }: TrainingTimeProps) => {
	const theme = useTheme();
	const maxTime = Math.max(...trainingTimeData.map(d => d.time), 1);
	const avgTime = trainingTimeData.reduce((sum, item) => sum + item.time, 0) / trainingTimeData.length;
	const gradientId = `timeGradient-${title.replace(/\s+/g, '-')}`;

	return (
		<Paper elevation={0} sx={{
			p: 3,
			borderRadius: 2,
			bgcolor: 'background.paper',
			border: `1px solid ${theme.palette.divider}`,
			mb: 3,
			position: 'relative',
			overflow: 'hidden'
		}}>
			<Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
				<Typography variant="h6" sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 1,
					fontWeight: 600,
					color: theme.palette.text.primary
				}}>
					<AccessTimeIcon color="secondary" />
					{title}
				</Typography>

				<Stack direction="row" spacing={1} alignItems="center">
					<Chip
						label={`Среднее: ${avgTime.toFixed(1)} сек`}
						color="secondary"
						variant="filled"
						size="small"
						sx={{ fontWeight: 500 }}
					/>
					{onRefresh && (
						<Tooltip title="Обновить данные">
							<IconButton
								onClick={onRefresh}
								size="small"
								sx={{
									backgroundColor: theme.palette.action.hover,
									'&:hover': {
										backgroundColor: theme.palette.action.selected
									}
								}}
							>
								<RefreshIcon fontSize="small" />
							</IconButton>
						</Tooltip>
					)}
				</Stack>
			</Stack>

			<Box sx={{
				height: 350,
				position: 'relative',
				'& .recharts-cartesian-grid line': {
					stroke: theme.palette.divider,
					opacity: 0.3
				}
			}}>
				<ResponsiveContainer width="100%" height="100%">
					<ComposedChart data={trainingTimeData}>
						<defs>
							<linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor={theme.palette.secondary.main} stopOpacity={0.8}/>
								<stop offset="95%" stopColor={theme.palette.secondary.main} stopOpacity={0.1}/>
							</linearGradient>
						</defs>

						<CartesianGrid strokeDasharray="3 3" />
						<XAxis
							dataKey="name"
							tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
							tickMargin={10}
							tickLine={false}
						/>
						<YAxis
							domain={[0, maxTime * 1.2]}
							tickFormatter={(value) => `${value} сек`}
							tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
							tickLine={false}
						/>

						<ReferenceLine
							y={avgTime}
							stroke={theme.palette.warning.main}
							strokeDasharray="3 3"
						>
							<Label
								value={`Среднее: ${avgTime.toFixed(1)}с`}
								position="insideTopRight"
								fill={theme.palette.warning.main}
							/>
						</ReferenceLine>

						<RechartsTooltip
							formatter={(value: number) => [`${value} сек`, 'Время']}
							labelFormatter={(label) => `Период: ${label}`}
							contentStyle={{
								background: theme.palette.background.default,
								borderColor: theme.palette.divider,
								borderRadius: 8,
								boxShadow: theme.shadows[2],
								fontSize: 14
							}}
							itemStyle={{
								color: theme.palette.text.primary
							}}
						/>

						<Area
							type="monotone"
							dataKey="time"
							fill={`url(#${gradientId})`}
							stroke={theme.palette.secondary.main}
							strokeWidth={3}
							fillOpacity={0.2}
							activeDot={{
								r: 6,
								stroke: theme.palette.secondary.dark,
								strokeWidth: 2,
								fill: theme.palette.secondary.light
							}}
							name="Время ответа"
						/>

						<Line
							type="monotone"
							dataKey="time"
							stroke={theme.palette.secondary.dark}
							strokeWidth={2}
							dot={{
								r: 4,
								stroke: theme.palette.secondary.main,
								strokeWidth: 2,
								fill: theme.palette.background.paper
							}}
							activeDot={{
								r: 6,
								stroke: theme.palette.secondary.dark,
								strokeWidth: 2,
								fill: theme.palette.secondary.light
							}}
							name="Время ответа"
						/>
					</ComposedChart>
				</ResponsiveContainer>
			</Box>
		</Paper>
	);
};

export default ModelTrainingTime;