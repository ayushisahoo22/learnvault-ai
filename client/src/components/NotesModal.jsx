function NotesModal(){
    return(
        <div className="fixed inset-0 ...">
            <div className="bg-slate-900 ...">
                <button onClick={() => setSelectedNote(null)}>
                    Close
                </button>

                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                >
                    {note.notes}
                </ReactMarkdown>
            </div>
        </div>
    )
}