import { Typography, Box, Paper, useTheme, Stack, Chip } from '@mui/material';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Area, ReferenceLine, Label } from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface ProductiveProps {
	performanceData: Array<{
		name: string;
		accuracy: number;
		[key: string]: any;
	}>;
	title: string;
}

const ModelProductive = ({ performanceData, title }: ProductiveProps) => {
	const theme = useTheme();
	const lastAccuracy = performanceData[performanceData.length - 1]?.accuracy || 0;
	const avgAccuracy = performanceData.reduce((sum, item) => sum + item.accuracy, 0) / performanceData.length;
	const gradientId = `accuracyGradient-${title.replace(/\s+/g, '-')}`;

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
					<TrendingUpIcon color="primary" />
					{title}
				</Typography>
				<Chip
					label={`Текущая: ${(lastAccuracy * 100).toFixed(1)}%`}
					color="primary"
					variant="filled"
					size="small"
					sx={{ fontWeight: 500 }}
				/>
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
					<ComposedChart data={performanceData}>
						<defs>
							<linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8}/>
								<stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0.1}/>
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
							tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
							tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
							tickLine={false}
							domain={[0, 1]}
						/>

						<ReferenceLine
							y={avgAccuracy}
							stroke={theme.palette.warning.main}
							strokeDasharray="3 3"
						>
							<Label
								value={`Среднее: ${(avgAccuracy * 100).toFixed(1)}%`}
								position="insideTopRight"
								fill={theme.palette.warning.main}
							/>
						</ReferenceLine>

						<Tooltip
							formatter={(value: number) => [`${(value * 100).toFixed(2)}%`, 'Точность']}
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
							dataKey="accuracy"
							fill={`url(#${gradientId})`}
							stroke={theme.palette.primary.main}
							strokeWidth={3}
							fillOpacity={0.2}
							activeDot={{
								r: 6,
								stroke: theme.palette.primary.dark,
								strokeWidth: 2,
								fill: theme.palette.primary.light
							}}
							name="Точность"
						/>

						<Line
							type="monotone"
							dataKey="accuracy"
							stroke={theme.palette.primary.dark}
							strokeWidth={2}
							dot={{
								r: 4,
								stroke: theme.palette.primary.main,
								strokeWidth: 2,
								fill: theme.palette.background.paper
							}}
							activeDot={{
								r: 6,
								stroke: theme.palette.primary.dark,
								strokeWidth: 2,
								fill: theme.palette.primary.light
							}}
							name="Точность"
						/>
					</ComposedChart>
				</ResponsiveContainer>
			</Box>
		</Paper>
	);
};

export default ModelProductive;