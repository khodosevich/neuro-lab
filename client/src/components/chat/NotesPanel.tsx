import { useState, useEffect } from 'react';
import { IconButton, Drawer, List, ListItem, ListItemText, TextField, Button, Typography, Divider, Paper, ListItemSecondaryAction, useTheme } from '@mui/material';
import NotesIcon from '@mui/icons-material/Notes';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Note } from '../../types/type.ts';
import { methods } from '../../api/methods.ts';

const NotesPanel = ({ modelId }: { modelId: string }) => {
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [notes, setNotes] = useState<Note[]>([]);
	const [newNote, setNewNote] = useState({ title: '', content: '' });
	const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
	const [editNote, setEditNote] = useState({ title: '', content: '' });
	const user = useSelector((state: RootState) => state.user.user);

	const fetchNotes = async () => {
		if (!user) return;

		try {
			const response = await methods.notes.getNotesForModel({
				userId: user.id,
				modelId: Number(modelId)
			});

			setNotes(response.data);
		} catch (error) {
			console.error('Error fetching notes:', error);
			setNotes([]);
		}
	};

	useEffect(() => {
		if (open && user) {
			fetchNotes();
		}
	}, [open, modelId, user]);

	const handleAddNote = async () => {
		if (!newNote.title || !newNote.content || !user) return;

		try {
			await methods.notes.createNote({
				user_id: user.id,
				model_id: Number(modelId),
				title: newNote.title,
				content: newNote.content
			});
			setNewNote({ title: '', content: '' });
			await fetchNotes();
		} catch (error) {
			console.error('Error creating note:', error);
		}
	};

	const handleDeleteNote = async (noteId: number) => {
		if (!user) return;

		try {
			await methods.notes.deleteNote({
				id: noteId,
				user_id: user.id
			});
			await fetchNotes();
		} catch (error) {
			console.error('Error deleting note:', error);
		}
	};

	const startEditing = (note: Note) => {
		setEditingNoteId(note.id);
		setEditNote({
			title: note.title,
			content: note.content
		});
	};

	const handleUpdateNote = async () => {
		if (!editingNoteId || !user) return;

		try {
			await methods.notes.updateNote({
				id: editingNoteId,
				user_id: user.id,
				title: editNote.title,
				content: editNote.content
			});
			setEditingNoteId(null);
			await fetchNotes();
		} catch (error) {
			console.error('Error updating note:', error);
		}
	};

	return (
		<>
			<IconButton
				onClick={() => setOpen(true)}
				sx={{
					width: '40px',
					height: '40px',
					backgroundColor: theme.palette.mode === 'dark' ? '#00000033' : '#f5f5f5',
					color: theme.palette.text.primary,
					'&:hover': {
						backgroundColor: theme.palette.mode === 'dark' ? '#00000066' : '#e0e0e0'
					}
				}}
			>
				<NotesIcon />
			</IconButton>

			<Drawer
				anchor="right"
				open={open}
				onClose={() => {
					setOpen(false);
					setEditingNoteId(null);
				}}
				sx={{
					'& .MuiDrawer-paper': {
						width: 350,
						backgroundColor: theme.palette.background.paper,
						color: theme.palette.text.primary,
						p: 2
					}
				}}
			>
				<Typography variant="h6" sx={{ mb: 2 }}>
					Мои заметки
				</Typography>
				<Divider sx={{ bgcolor: theme.palette.divider, mb: 2 }} />

				<Paper sx={{
					p: 2,
					mb: 2,
					backgroundColor: theme.palette.mode === 'dark' ? '#00000033' : '#f5f5f5'
				}}>
					<TextField
						fullWidth
						label="Заголовок"
						value={editingNoteId ? editNote.title : newNote.title}
						onChange={(e) =>
							editingNoteId
							? setEditNote({...editNote, title: e.target.value})
							: setNewNote({...newNote, title: e.target.value})
						}
						sx={{ mb: 2 }}
						InputProps={{
							style: { color: theme.palette.text.primary }
						}}
						InputLabelProps={{
							style: { color: theme.palette.text.secondary }
						}}
					/>
					<TextField
						fullWidth
						multiline
						rows={3}
						label="Содержание"
						value={editingNoteId ? editNote.content : newNote.content}
						onChange={(e) =>
							editingNoteId
							? setEditNote({...editNote, content: e.target.value})
							: setNewNote({...newNote, content: e.target.value})
						}
						sx={{ mb: 2 }}
						InputProps={{
							style: { color: theme.palette.text.primary }
						}}
						InputLabelProps={{
							style: { color: theme.palette.text.secondary }
						}}
					/>
					{editingNoteId ? (
						<Button
							variant="contained"
							color="primary"
							onClick={handleUpdateNote}
							fullWidth
						>
							Обновить заметку
						</Button>
					) : (
						 <Button
							 variant="contained"
							 color="primary"
							 startIcon={<AddIcon />}
							 onClick={handleAddNote}
							 fullWidth
						 >
							 Добавить заметку
						 </Button>
					 )}
				</Paper>

				<List>
					{notes?.map((note) => (
						<ListItem
							key={note.id}
							sx={{
								mb: 1,
								backgroundColor: theme.palette.mode === 'dark' ? '#00000033' : '#f5f5f5',
								borderRadius: 1,
								'&:hover': {
									backgroundColor: theme.palette.mode === 'dark' ? '#00000066' : '#e0e0e0'
								}
							}}
						>
							<ListItemText
								primary={note.title}
								secondary={note.content}
								primaryTypographyProps={{ color: theme.palette.text.primary }}
								secondaryTypographyProps={{ color: theme.palette.text.secondary }}
							/>
							<ListItemSecondaryAction>
								<IconButton
									edge="end"
									onClick={() => startEditing(note)}
									color="inherit"
								>
									<EditIcon fontSize="small" />
								</IconButton>
								<IconButton
									edge="end"
									onClick={() => handleDeleteNote(note.id)}
									color="error"
								>
									<DeleteIcon fontSize="small" />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					))}
				</List>
			</Drawer>
		</>
	);
};

export default NotesPanel;