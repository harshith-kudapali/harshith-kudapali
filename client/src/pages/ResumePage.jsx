import { useState, useEffect, useRef } from 'react';
import { 
  FileText, Download, ChevronLeft, ChevronRight, X, Menu, 
  Maximize, Minimize, Pen, Highlighter, StickyNote, 
  Move, Eraser, Check, Undo, Redo, Save
} from 'lucide-react';

// Mock data for PDF files - you would replace this with your Google Drive API fetch
const mockPdfs = [
  { id: '1', name: 'Resume_2025.pdf', thumbnail: '/api/placeholder/120/160', url: '#' },
  { id: '2', name: 'CV_Technical.pdf', thumbnail: '/api/placeholder/120/160', url: '#' },
  { id: '3', name: 'Portfolio_Summary.pdf', thumbnail: '/api/placeholder/120/160', url: '#' },
];

export default function ResumePage() {
  const [pdfs, setPdfs] = useState(mockPdfs);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Annotation states
  const [isAnnotationMode, setIsAnnotationMode] = useState(false);
  const [annotationTool, setAnnotationTool] = useState(null); // 'pen', 'highlighter', 'note', 'eraser'
  const [penColor, setPenColor] = useState('#ff0000'); // Default red
  const [penSize, setPenSize] = useState(2); // Default pen size
  const [annotations, setAnnotations] = useState({}); // Store annotations by page
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState([]);
  const [annotationHistory, setAnnotationHistory] = useState([]); // For undo/redo
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const canvasRef = useRef(null);
  const pdfContainerRef = useRef(null);
  
  // Fetch PDFs from Google Drive
  useEffect(() => {
    // In a real implementation, you would:
    // 1. Use Google Drive API to fetch PDFs from a folder
    // 2. Get thumbnails and metadata
    // 3. Update the pdfs state with the fetched data
    
    // This is a placeholder for the actual API call
    const fetchPdfsFromDrive = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Keep using mock data for now
        setPdfs(mockPdfs);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPdfsFromDrive();
  }, []);

  // Initialize canvas when the PDF is loaded and annotation mode is active
  useEffect(() => {
    if (selectedPdf && isAnnotationMode && canvasRef.current) {
      const canvas = canvasRef.current;
      const container = pdfContainerRef.current;
      
      if (container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        
        // Load existing annotations for the current page
        drawSavedAnnotations();
      }
    }
  }, [selectedPdf, isAnnotationMode, currentPage, zoom]);

  // Handle PDF selection
  const openPdf = (pdf) => {
    setIsLoading(true);
    setSelectedPdf(pdf);
    setCurrentPage(1);
    setTotalPages(5); // Mock value - would come from actual PDF metadata
    setTimeout(() => setIsLoading(false), 800); // Simulate loading time
  };

  // Handle page navigation
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle zoom
  const increaseZoom = () => setZoom(Math.min(zoom + 25, 200));
  const decreaseZoom = () => setZoom(Math.max(zoom - 25, 50));

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Annotation functions
  const toggleAnnotationMode = () => {
    if (!isAnnotationMode) {
      setIsAnnotationMode(true);
      setAnnotationTool('pen'); // Default to pen tool when entering annotation mode
    } else {
      setIsAnnotationMode(false);
      setAnnotationTool(null);
    }
  };

  const selectAnnotationTool = (tool) => {
    setAnnotationTool(tool);
  };

  const handleMouseDown = (e) => {
    if (!isAnnotationMode || !annotationTool || annotationTool === 'note') return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setCurrentPath([{ x, y, tool: annotationTool, color: penColor, size: penSize }]);
    
    // Start drawing
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    
    if (annotationTool === 'highlighter') {
      ctx.globalAlpha = 0.3; // Make highlighter semi-transparent
      ctx.lineWidth = penSize * 3; // Make highlighter thicker
    } else {
      ctx.globalAlpha = 1.0;
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Add to current path
    setCurrentPath(prev => [...prev, { x, y }]);
    
    // Draw the line
    const ctx = canvas.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    
    setIsDrawing(false);
    
    // Save the path to annotations
    if (currentPath.length > 0) {
      const pageKey = `page-${currentPage}`;
      const updatedAnnotations = { ...annotations };
      
      if (!updatedAnnotations[pageKey]) {
        updatedAnnotations[pageKey] = [];
      }
      
      updatedAnnotations[pageKey].push([...currentPath]);
      setAnnotations(updatedAnnotations);
      
      // Save to history for undo/redo
      const newHistory = annotationHistory.slice(0, historyIndex + 1);
      newHistory.push({
        action: 'add',
        pageKey,
        pathIndex: updatedAnnotations[pageKey].length - 1,
        path: [...currentPath]
      });
      setAnnotationHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  const addStickyNote = (e) => {
    if (annotationTool !== 'note') return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const noteText = prompt('Enter note text:');
    if (!noteText) return;
    
    const pageKey = `page-${currentPage}`;
    const updatedAnnotations = { ...annotations };
    
    if (!updatedAnnotations[pageKey]) {
      updatedAnnotations[pageKey] = [];
    }
    
    const note = {
      tool: 'note',
      x,
      y,
      text: noteText,
      color: penColor
    };
    
    updatedAnnotations[pageKey].push([note]);
    setAnnotations(updatedAnnotations);
    
    // Draw the note
    drawStickyNote(note);
    
    // Save to history
    const newHistory = annotationHistory.slice(0, historyIndex + 1);
    newHistory.push({
      action: 'add',
      pageKey,
      pathIndex: updatedAnnotations[pageKey].length - 1,
      path: [note]
    });
    setAnnotationHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const drawStickyNote = (note) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Draw note background
    ctx.fillStyle = 'rgba(255, 255, 0, 0.7)'; // Yellow sticky note
    ctx.fillRect(note.x, note.y, 150, 100);
    
    // Draw note text
    ctx.fillStyle = '#000';
    ctx.font = '14px Arial';
    
    // Wrap text
    const words = note.text.split(' ');
    let line = '';
    let y = note.y + 20;
    const maxWidth = 140;
    
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line, note.x + 5, y);
        line = words[i] + ' ';
        y += 20;
        
        if (y > note.y + 90) break; // Don't overflow the note
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, note.x + 5, y);
  };

  const drawSavedAnnotations = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const pageKey = `page-${currentPage}`;
    const pageAnnotations = annotations[pageKey] || [];
    
    pageAnnotations.forEach(path => {
      if (path.length > 0) {
        // Check if it's a sticky note
        if (path[0].tool === 'note') {
          drawStickyNote(path[0]);
          return;
        }
        
        // It's a drawing path
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = path[0].color;
        ctx.lineWidth = path[0].size;
        
        if (path[0].tool === 'highlighter') {
          ctx.globalAlpha = 0.3;
          ctx.lineWidth = path[0].size * 3;
        } else {
          ctx.globalAlpha = 1.0;
        }
        
        for (let i = 1; i < path.length; i++) {
          ctx.lineTo(path[i].x, path[i].y);
        }
        
        ctx.stroke();
      }
    });
  };

  const handleUndo = () => {
    if (historyIndex >= 0) {
      const action = annotationHistory[historyIndex];
      const updatedAnnotations = { ...annotations };
      
      if (action.action === 'add') {
        // Remove the path
        updatedAnnotations[action.pageKey].splice(action.pathIndex, 1);
      }
      
      setAnnotations(updatedAnnotations);
      setHistoryIndex(historyIndex - 1);
      drawSavedAnnotations();
    }
  };

  const handleRedo = () => {
    if (historyIndex < annotationHistory.length - 1) {
      const action = annotationHistory[historyIndex + 1];
      const updatedAnnotations = { ...annotations };
      
      if (action.action === 'add') {
        // Re-add the path
        if (!updatedAnnotations[action.pageKey]) {
          updatedAnnotations[action.pageKey] = [];
        }
        
        updatedAnnotations[action.pageKey].splice(action.pathIndex, 0, action.path);
      }
      
      setAnnotations(updatedAnnotations);
      setHistoryIndex(historyIndex + 1);
      drawSavedAnnotations();
    }
  };

  const handleEraser = (e) => {
    if (annotationTool !== 'eraser' || !isDrawing) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const pageKey = `page-${currentPage}`;
    const pageAnnotations = annotations[pageKey] || [];
    
    // Find paths that intersect with the eraser
    const eraserSize = 20;
    let pathsToRemove = [];
    
    pageAnnotations.forEach((path, pathIndex) => {
      // Skip sticky notes for now - would need a more complex hitbox
      if (path.length > 0 && path[0].tool === 'note') {
        const note = path[0];
        if (x >= note.x && x <= note.x + 150 && y >= note.y && y <= note.y + 100) {
          pathsToRemove.push(pathIndex);
        }
        return;
      }
      
      // Check each segment of the path
      for (let i = 1; i < path.length; i++) {
        const dx = path[i].x - path[i-1].x;
        const dy = path[i].y - path[i-1].y;
        const len = Math.sqrt(dx * dx + dy * dy);
        
        if (len === 0) continue;
        
        // Check if the eraser intersects this segment
        const closestT = ((x - path[i-1].x) * dx + (y - path[i-1].y) * dy) / (len * len);
        const clampedT = Math.max(0, Math.min(1, closestT));
        
        const closestX = path[i-1].x + clampedT * dx;
        const closestY = path[i-1].y + clampedT * dy;
        
        const distance = Math.sqrt((x - closestX) * (x - closestX) + (y - closestY) * (y - closestY));
        
        if (distance < eraserSize) {
          pathsToRemove.push(pathIndex);
          break;
        }
      }
    });
    
    // Remove the paths (in reverse order to avoid index issues)
    if (pathsToRemove.length > 0) {
      const updatedAnnotations = { ...annotations };
      pathsToRemove.sort((a, b) => b - a);
      
      pathsToRemove.forEach(index => {
        updatedAnnotations[pageKey].splice(index, 1);
      });
      
      setAnnotations(updatedAnnotations);
      drawSavedAnnotations();
    }
  };

  const saveAnnotations = () => {
    // In a real app, you'd save to backend/database
    alert('Annotations saved! (In a real app, this would save to a database)');
    
    // This is where you'd make an API call to save annotations
    console.log('Saving annotations:', annotations);
  };

  return (
    <div className="flex h-screen bg-transparent text-gray-100">
      <div className="w-full h-full flex overflow-hidden rounded-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/20">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-64 border-r border-cyan-800/50 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-cyan-300">My Resumes</h2>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-cyan-400 hover:text-cyan-300"
              >
                <X size={20} />
              </button>
            </div>
            
            {isLoading && !selectedPdf ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-pulse text-cyan-400">Loading documents...</div>
              </div>
            ) : (
              <ul className="space-y-4">
                {pdfs.map((pdf) => (
                  <li 
                    key={pdf.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedPdf?.id === pdf.id 
                        ? "bg-cyan-900/30 border border-cyan-500/50 shadow-md shadow-cyan-500/20" 
                        : "hover:bg-gray-800/40 border border-transparent"
                    }`}
                    onClick={() => openPdf(pdf)}
                  >
                    <div className="flex items-center space-x-3">
                      <FileText size={20} className="text-cyan-400" />
                      <span className={selectedPdf?.id === pdf.id ? "text-cyan-300 font-medium" : ""}>{pdf.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* PDF Viewer */}
        <div className="flex-1 flex flex-col bg-black/30 backdrop-blur-md overflow-hidden">
          {!sidebarOpen && (
            <button 
              onClick={() => setSidebarOpen(true)}
              className="absolute top-4 left-4 z-10 bg-black/50 p-2 rounded-full text-cyan-400 hover:text-cyan-300 hover:bg-black/70 transition-all"
            >
              <Menu size={20} />
            </button>
          )}
          
          {selectedPdf ? (
            <>
              {/* Viewer Toolbar */}
              <div className="bg-black/60 backdrop-blur-md border-b border-cyan-800/50 p-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setSelectedPdf(null)}
                    className="p-1 rounded-md hover:bg-gray-700/50 text-cyan-400"
                  >
                    <X size={20} />
                  </button>
                  <span className="text-gray-300 text-sm">{selectedPdf.name}</span>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Page Navigation */}
                  <div className="flex items-center space-x-1">
                    <button 
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                      className="p-1 rounded-md hover:bg-gray-700/50 text-cyan-400 disabled:text-gray-600"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    
                    <span className="text-gray-300 text-sm">
                      {currentPage} / {totalPages}
                    </span>
                    
                    <button 
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="p-1 rounded-md hover:bg-gray-700/50 text-cyan-400 disabled:text-gray-600"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  {/* Zoom Controls */}
                  <div className="flex items-center space-x-1">
                    <button 
                      onClick={decreaseZoom}
                      className="p-1 rounded-md hover:bg-gray-700/50 text-cyan-400"
                    >
                      -
                    </button>
                    
                    <span className="text-gray-300 text-sm">
                      {zoom}%
                    </span>
                    
                    <button 
                      onClick={increaseZoom}
                      className="p-1 rounded-md hover:bg-gray-700/50 text-cyan-400"
                    >
                      +
                    </button>
                  </div>

                  {/* Additional Controls */}
                  <div className="flex items-center space-x-1">
                    <button 
                      onClick={toggleFullscreen}
                      className="p-1 rounded-md hover:bg-gray-700/50 text-cyan-400"
                    >
                      {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                    </button>
                    
                    <a 
                      href={selectedPdf.url}
                      download={selectedPdf.name}
                      className="p-1 rounded-md hover:bg-gray-700/50 text-cyan-400"
                    >
                      <Download size={20} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Annotation Toolbar - Only visible when a PDF is selected */}
              <div className="bg-black/60 backdrop-blur-md border-b border-cyan-800/50 p-2 flex items-center">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={toggleAnnotationMode}
                    className={`p-1 rounded-md hover:bg-gray-700/50 ${
                      isAnnotationMode ? 'bg-cyan-900/70 text-cyan-300' : 'text-cyan-400'
                    }`}
                  >
                    <Pen size={20} />
                  </button>
                  
                  {isAnnotationMode && (
                    <>
                      {/* Tool Selection */}
                      <div className="flex items-center space-x-1 border-l pl-2 border-cyan-800/50">
                        <button 
                          onClick={() => selectAnnotationTool('pen')}
                          className={`p-1 rounded-md hover:bg-gray-700/50 ${
                            annotationTool === 'pen' ? 'bg-cyan-900/70 text-cyan-300' : 'text-cyan-400'
                          }`}
                        >
                          <Pen size={16} />
                        </button>
                        
                        <button 
                          onClick={() => selectAnnotationTool('highlighter')}
                          className={`p-1 rounded-md hover:bg-gray-700/50 ${
                            annotationTool === 'highlighter' ? 'bg-cyan-900/70 text-cyan-300' : 'text-cyan-400'
                          }`}
                        >
                          <Highlighter size={16} />
                        </button>
                        
                        <button 
                          onClick={() => selectAnnotationTool('note')}
                          className={`p-1 rounded-md hover:bg-gray-700/50 ${
                            annotationTool === 'note' ? 'bg-cyan-900/70 text-cyan-300' : 'text-cyan-400'
                          }`}
                        >
                          <StickyNote size={16} />
                        </button>
                        
                        <button 
                          onClick={() => selectAnnotationTool('eraser')}
                          className={`p-1 rounded-md hover:bg-gray-700/50 ${
                            annotationTool === 'eraser' ? 'bg-cyan-900/70 text-cyan-300' : 'text-cyan-400'
                          }`}
                        >
                          <Eraser size={16} />
                        </button>
                      </div>
                      
                      {/* Color Selection */}
                      <div className="flex items-center space-x-1 border-l pl-2 border-cyan-800/50">
                        {['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#000000'].map(color => (
                          <button 
                            key={color}
                            onClick={() => setPenColor(color)}
                            className={`w-4 h-4 rounded-full ${
                              penColor === color ? 'ring-2 ring-white' : ''
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      
                      {/* Pen Size */}
                      <div className="flex items-center space-x-1 border-l pl-2 border-cyan-800/50">
                        <button 
                          onClick={() => setPenSize(1)}
                          className={`p-1 rounded-md hover:bg-gray-700/50 ${
                            penSize === 1 ? 'bg-cyan-900/70 text-cyan-300' : 'text-cyan-400'
                          }`}
                        >
                          <div className="w-1 h-1 bg-current rounded-full mx-auto" />
                        </button>
                        
                        <button 
                          onClick={() => setPenSize(2)}
                          className={`p-1 rounded-md hover:bg-gray-700/50 ${
                            penSize === 2 ? 'bg-cyan-900/70 text-cyan-300' : 'text-cyan-400'
                          }`}
                        >
                          <div className="w-2 h-2 bg-current rounded-full mx-auto" />
                        </button>
                        
                        <button 
                          onClick={() => setPenSize(4)}
                          className={`p-1 rounded-md hover:bg-gray-700/50 ${
                            penSize === 4 ? 'bg-cyan-900/70 text-cyan-300' : 'text-cyan-400'
                          }`}
                        >
                          <div className="w-3 h-3 bg-current rounded-full mx-auto" />
                        </button>
                      </div>
                      
                      {/* Undo/Redo */}
                      <div className="flex items-center space-x-1 border-l pl-2 border-cyan-800/50">
                        <button 
                          onClick={handleUndo}
                          disabled={historyIndex < 0}
                          className="p-1 rounded-md hover:bg-gray-700/50 text-cyan-400 disabled:text-gray-600"
                        >
                          <Undo size={16} />
                        </button>
                        
                        <button 
                          onClick={handleRedo}
                          disabled={historyIndex >= annotationHistory.length - 1}
                          className="p-1 rounded-md hover:bg-gray-700/50 text-cyan-400 disabled:text-gray-600"
                        >
                          <Redo size={16} />
                        </button>
                      </div>
                      
                      {/* Save Annotations */}
                      <div className="flex items-center space-x-1 border-l pl-2 border-cyan-800/50">
                        <button 
                          onClick={saveAnnotations}
                          className="p-1 rounded-md hover:bg-gray-700/50 bg-cyan-800/40 text-cyan-300 flex items-center"
                        >
                          <Save size={16} className="mr-1" />
                          <span className="text-xs">Save</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* PDF Content */}
              <div className="flex-1 overflow-auto p-4 flex justify-center bg-gradient-to-b from-gray-900/70 to-black/70 backdrop-blur-sm">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-cyan-400">Loading PDF...</p>
                  </div>
                ) : (
                  <div 
                    ref={pdfContainerRef}
                    className="bg-white shadow-lg shadow-cyan-500/20 transition-all relative"
                    style={{ 
                      width: `${zoom}%`, 
                      maxWidth: zoom > 100 ? 'none' : '800px',
                      height: '1000px' // Simulated PDF height
                    }}
                    onClick={annotationTool === 'note' ? addStickyNote : undefined}
                  >
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-800">
                      <div className="text-center">
                        <img 
                          src="/api/placeholder/600/800" 
                          alt="PDF Preview" 
                          className="mx-auto border border-gray-300"
                        />
                        <p className="mt-4 text-lg">
                          Page {currentPage} of {selectedPdf.name}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          {isAnnotationMode ? 'Annotation mode enabled - try drawing on the page!' : 
                           '(This is a placeholder - actual PDF content would be rendered here)'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Canvas overlay for annotations */}
                    {isAnnotationMode && (
                      <canvas
                        ref={canvasRef}
                        className="absolute inset-0 z-10 cursor-crosshair"
                        onMouseDown={handleMouseDown}
                        onMouseMove={(e) => {
                          handleMouseMove(e);
                          if (annotationTool === 'eraser') handleEraser(e);
                        }}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                      />
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-gray-900/50 to-black/70 backdrop-blur-sm">
              <div className="text-center p-8 backdrop-blur-md bg-black/30 rounded-xl border border-cyan-500/20 shadow-lg shadow-cyan-500/10">
                <FileText size={64} className="mx-auto text-cyan-500 opacity-50" />
                <h3 className="mt-4 text-xl text-cyan-400 font-light">Select a resume to view</h3>
                <p className="mt-2 text-gray-400 max-w-md">
                  Choose a document from the sidebar to preview and download your resume files
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )}