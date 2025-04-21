import { Typography, Box, Paper, useTheme, Stack, Chip, Tooltip, IconButton } from '@mui/material';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis, Label, Legend } from 'recharts';
import { ModelTrainingTimeType } from '../../types/type.ts';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';

const ModelTrainingTime = ({
	                           trainingTimeData,
	                           onRefresh
                           }: {
	trainingTimeData: ModelTrainingTimeType[],
	onRefresh?: () => void
}) => {
	const theme = useTheme();
	const maxTime = Math.max(...trainingTimeData.map(d => d.time));
	const totalTime = trainingTimeData.reduce((sum, item) => sum + item.time, 0);

	return (
		<Paper elevation={0} sx={{
			p: 4,
			borderRadius: 4,
			bgcolor: 'background.paper',
			border: `1px solid ${theme.palette.divider}`,
			mb: 4,
			position: 'relative'
		}}>
			<Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
				<Typography variant="h5" sx={{
					fontWeight: 600,
					display: 'flex',
					alignItems: 'center',
					gap: 1
				}}>
					<AccessTimeIcon color="primary" />
					Время обучения модели
				</Typography>

				<Stack direction="row" spacing={2} alignItems="center">
					<Chip
						label={`Общее время: ${totalTime.toFixed(1)} сек`}
						color="secondary"
						variant="outlined"
						size="small"
					/>
					{onRefresh && (
						<Tooltip title="Обновить данные">
							<IconButton onClick={onRefresh} size="small">
								<RefreshIcon fontSize="small" />
							</IconButton>
						</Tooltip>
					)}
				</Stack>
			</Stack>

			<Box sx={{
				height: 400,
				position: 'relative',
				'& .recharts-cartesian-grid-vertical line': {
					strokeDasharray: '3 3',
					stroke: theme.palette.divider
				},
				'& .recharts-cartesian-grid-horizontal line': {
					strokeDasharray: '3 3',
					stroke: theme.palette.divider
				}
			}}>
				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						data={trainingTimeData}
						margin={{ top: 5, right: 20, bottom: 20, left: 20 }}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis
							dataKey="name"
							tick={{ fill: theme.palette.text.secondary }}
							tickMargin={10}
						>
							<Label
								value="Эпохи обучения"
								position="bottom"
								offset={0}
								style={{
									fill: theme.palette.text.primary,
									fontSize: '0.875rem'
								}}
							/>
						</XAxis>
						<YAxis
							domain={[0, maxTime * 1.1]}
							tickFormatter={(value) => `${value} сек`}
							tick={{ fill: theme.palette.text.secondary }}
						>
							<Label
								value="Время (сек)"
								angle={-90}
								position="left"
								offset={-10}
								style={{
									fill: theme.palette.text.primary,
									fontSize: '0.875rem'
								}}
							/>
						</YAxis>
						<RechartsTooltip
							formatter={(value: number) => [`${value} сек`, 'Время']}
							labelFormatter={(label) => `Эпоха: ${label}`}
							contentStyle={{
								borderRadius: '12px',
								border: `1px solid ${theme.palette.divider}`,
								boxShadow: theme.shadows[2],
								background: theme.palette.background.paper
							}}
						/>
						<Legend
							wrapperStyle={{
								paddingTop: '20px'
							}}
						/>
						<Line
							type="monotone"
							dataKey="time"
							stroke={theme.palette.secondary.main}
							strokeWidth={3}
							dot={{
								r: 4,
								fill: theme.palette.secondary.light,
								stroke: theme.palette.secondary.dark,
								strokeWidth: 1
							}}
							activeDot={{
								r: 6,
								stroke: theme.palette.secondary.dark,
								strokeWidth: 2,
								fill: theme.palette.secondary.main
							}}
							name="Время обучения"
						/>
					</LineChart>
				</ResponsiveContainer>
			</Box>

			<Box sx={{
				display: 'flex',
				alignItems: 'center',
				mt: 2,
				color: theme.palette.text.secondary,
				fontSize: '0.875rem'
			}}>
				<InfoOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
				<Typography variant="caption">
					График показывает время обучения для каждой эпохи. Снижение времени может указывать на оптимизацию процесса.
				</Typography>
			</Box>
		</Paper>
	);
};

export default ModelTrainingTime;