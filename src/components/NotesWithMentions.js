import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  Send, 
  X, 
  AtSign, 
  User, 
  Users,
  MessageSquare,
  Edit,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { useApp } from '../context/AppContext';
import { useToast } from './ui/Toast';

const MentionDropdown = ({ mentions, onSelect, onClose, position }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="absolute z-50 bg-white border border-secondary-200 rounded-lg shadow-lg max-h-48 overflow-y-auto"
      style={{
        top: position.top,
        left: position.left,
        minWidth: '200px'
      }}
    >
      {mentions.map(mention => (
        <button
          key={mention.id}
          onClick={() => onSelect(mention)}
          className="w-full text-left px-3 py-2 hover:bg-secondary-50 flex items-center gap-2"
        >
          {mention.type === 'team' ? (
            <Users className="w-4 h-4 text-primary-600" />
          ) : (
            <User className="w-4 h-4 text-secondary-600" />
          )}
          <span className="text-sm">{mention.name}</span>
          <Badge variant="secondary" className="text-xs">
            {mention.type}
          </Badge>
        </button>
      ))}
    </div>
  );
};

const NoteItem = ({ note, onEdit, onDelete, isEditing, onSave, onCancel }) => {
  const [editContent, setEditContent] = useState(note.content);

  const handleSave = () => {
    onSave(note.id, editContent);
  };

  const handleCancel = () => {
    setEditContent(note.content);
    onCancel();
  };

  const renderContent = (content) => {
    // Simple mention highlighting
    return content.split(/(@\w+)/g).map((part, index) => {
      if (part.startsWith('@')) {
        return (
          <span key={index} className="bg-primary-100 text-primary-700 px-1 rounded text-sm font-medium">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="border-b border-secondary-200 pb-4 mb-4 last:border-b-0 last:mb-0 last:pb-0">
      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-3 border border-secondary-300 rounded-lg resize-none"
            rows={3}
            placeholder="Add a note..."
          />
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm font-medium text-secondary-900">{note.author}</p>
              <p className="text-xs text-secondary-500">{note.date}</p>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(note.id)}
                className="p-1"
              >
                <Edit className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(note.id)}
                className="p-1 text-danger-600 hover:text-danger-700"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
          <div className="text-sm text-secondary-700">
            {renderContent(note.content)}
          </div>
          {note.mentions && note.mentions.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {note.mentions.map(mention => (
                <Badge key={mention} variant="primary" className="text-xs">
                  @{mention}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export function NotesWithMentions({ candidateId, notes = [], onAddNote, onUpdateNote, onDeleteNote }) {
  const { mentions } = useApp();
  const { success } = useToast();
  
  const [newNote, setNewNote] = useState('');
  const [showMentions, setShowMentions] = useState(false);
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 });
  const [editingNote, setEditingNote] = useState(null);
  const [cursorPosition, setCursorPosition] = useState(0);
  
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const cursorPos = e.target.selectionStart;
    
    setNewNote(value);
    setCursorPosition(cursorPos);
    
    // Check for @ mention
    const textBeforeCursor = value.substring(0, cursorPos);
    const atIndex = textBeforeCursor.lastIndexOf('@');
    
    if (atIndex !== -1) {
      const textAfterAt = textBeforeCursor.substring(atIndex + 1);
      if (!textAfterAt.includes(' ') && !textAfterAt.includes('\n')) {
        // Show mentions dropdown
        const rect = e.target.getBoundingClientRect();
        setMentionPosition({
          top: rect.bottom + 5,
          left: rect.left
        });
        setShowMentions(true);
      } else {
        setShowMentions(false);
      }
    } else {
      setShowMentions(false);
    }
  };

  const handleMentionSelect = (mention) => {
    const textBeforeCursor = newNote.substring(0, cursorPosition);
    const textAfterCursor = newNote.substring(cursorPosition);
    const atIndex = textBeforeCursor.lastIndexOf('@');
    
    const newText = textBeforeCursor.substring(0, atIndex) + 
                   `@${mention.id} ` + 
                   textAfterCursor;
    
    setNewNote(newText);
    setShowMentions(false);
    
    // Focus back to textarea
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const newCursorPos = atIndex + mention.id.length + 2;
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

  const handleSubmit = () => {
    if (!newNote.trim()) return;
    
    // Extract mentions from the note
    const mentionMatches = newNote.match(/@(\w+)/g);
    const extractedMentions = mentionMatches ? mentionMatches.map(m => m.substring(1)) : [];
    
    const note = {
      id: Date.now().toString(),
      content: newNote,
      author: 'Current User',
      date: new Date().toISOString().split('T')[0],
      mentions: extractedMentions
    };
    
    onAddNote(candidateId, note);
    setNewNote('');
    success('Note added successfully');
  };

  const handleEditNote = (noteId) => {
    setEditingNote(noteId);
  };

  const handleSaveNote = (noteId, content) => {
    const mentionMatches = content.match(/@(\w+)/g);
    const extractedMentions = mentionMatches ? mentionMatches.map(m => m.substring(1)) : [];
    
    onUpdateNote(candidateId, noteId, {
      content,
      mentions: extractedMentions
    });
    setEditingNote(null);
    success('Note updated successfully');
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  const handleDeleteNote = (noteId) => {
    onDeleteNote(candidateId, noteId);
    success('Note deleted successfully');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Notes & Comments
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add new note */}
        <div className="space-y-3">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={newNote}
              onChange={handleInputChange}
              placeholder="Add a note... Use @ to mention team members"
              className="w-full p-3 border border-secondary-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={3}
            />
            {showMentions && (
              <MentionDropdown
                mentions={mentions}
                onSelect={handleMentionSelect}
                onClose={() => setShowMentions(false)}
                position={mentionPosition}
              />
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-secondary-500">
              <AtSign className="w-4 h-4" />
              <span>Use @ to mention team members</span>
            </div>
            <Button onClick={handleSubmit} disabled={!newNote.trim()}>
              <Send className="w-4 h-4 mr-2" />
              Add Note
            </Button>
          </div>
        </div>

        {/* Existing notes */}
        {notes.length > 0 ? (
          <div className="space-y-0">
            {notes.map(note => (
              <NoteItem
                key={note.id}
                note={note}
                isEditing={editingNote === note.id}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
                onSave={handleSaveNote}
                onCancel={handleCancelEdit}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-secondary-400">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No notes yet</p>
            <p className="text-xs">Add the first note to get started</p>
          </div>
        )}

        {/* Mentions help */}
        <div className="bg-secondary-50 rounded-lg p-3">
          <h4 className="text-sm font-medium text-secondary-900 mb-2">Available mentions:</h4>
          <div className="flex flex-wrap gap-2">
            {mentions.map(mention => (
              <Badge key={mention.id} variant="secondary" className="text-xs">
                @{mention.id}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
