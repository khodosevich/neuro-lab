import { Typography, Box, Paper, useTheme, Stack, Chip } from '@mui/material';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { PerformanceDataType } from '../../types/type.ts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const ModelProductive = ({ performanceData }: { performanceData: PerformanceDataType[] }) => {
	const theme = useTheme();
	const maxAccuracy = Math.max(...performanceData.map(d => d.accuracy));
	const lastAccuracy = performanceData[performanceData.length - 1]?.accuracy || 0;

	return (
		<Paper elevation={0} sx={{
			p: 4,
			borderRadius: 4,
			bgcolor: 'background.paper',
			border: `1px solid ${theme.palette.divider}`,
			mb: 4
		}}>
			<Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
				<Typography variant="h5" sx={{
					fontWeight: 600,
					display: 'flex',
					alignItems: 'center',
					gap: 1
				}}>
					<TrendingUpIcon color="primary" />
					Продуктивность модели
				</Typography>

				<Chip
					label={`Точность: ${(lastAccuracy * 100).toFixed(1)}%`}
					color="primary"
					variant="outlined"
					size="small"
				/>
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
						data={performanceData}
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
							domain={[0, maxAccuracy * 1.1]}
							tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
							tick={{ fill: theme.palette.text.secondary }}
						>
							<Label
								value="Точность"
								angle={-90}
								position="left"
								offset={-10}
								style={{
									fill: theme.palette.text.primary,
									fontSize: '0.875rem'
								}}
							/>
						</YAxis>
						<Tooltip
							formatter={(value: number) => [`${(value * 100).toFixed(2)}%`, 'Точность']}
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
							dataKey="accuracy"
							stroke={theme.palette.primary.main}
							strokeWidth={3}
							dot={{ r: 4, fill: theme.palette.primary.light }}
							activeDot={{
								r: 6,
								stroke: theme.palette.primary.dark,
								strokeWidth: 2,
								fill: theme.palette.primary.main
							}}
							name="Точность"
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
					График показывает изменение точности модели в процессе обучения
				</Typography>
			</Box>
		</Paper>
	);
};

export default ModelProductive;