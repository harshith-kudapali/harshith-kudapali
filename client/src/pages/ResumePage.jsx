import { useState, useEffect, useRef } from 'react';
import {
  FileText, Download, ChevronLeft, ChevronRight, X, Menu,
  Maximize, Minimize, Pen, Highlighter, StickyNote,
  Move, Eraser, Check, Undo, Redo, Save
} from 'lucide-react';
import { backendApi } from '../App';

export default function ResumePage() {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState('');

  // Annotation states
  const [isAnnotationMode, setIsAnnotationMode] = useState(false);
  const [annotationTool, setAnnotationTool] = useState(null);
  const [penColor, setPenColor] = useState('#ff0000');
  const [penSize, setPenSize] = useState(2);
  const [annotations, setAnnotations] = useState({});
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState([]);
  const [annotationHistory, setAnnotationHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const canvasRef = useRef(null);
  const pdfContainerRef = useRef(null);

  // Convert Google Drive view URL to embed URL
  const convertToEmbedUrl = (viewUrl) => {
    if (!viewUrl) return '';

    // Extract file ID from various Google Drive URL formats
    const fileIdMatch = viewUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (fileIdMatch) {
      const fileId = fileIdMatch[1];
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }

    return viewUrl;
  };

  // Fetch PDFs from server
  useEffect(() => {
    const fetchPdfsFromDrive = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await fetch(`${backendApi}/api/resumes`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPdfs(data);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
        setError('Failed to load resumes. Please check your connection and try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPdfsFromDrive();
  }, []);

  // Save annotations to server
  const saveAnnotations = async () => {
    if (!selectedPdf) return;

    try {
      const response = await fetch(`${backendApi}/api/resumes/${selectedPdf._id}/annotations`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ annotations }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert('Annotations saved successfully!');
    } catch (error) {
      console.error("Save failed", error);
      alert('Failed to save annotations. Please try again.');
    }
  };

  // Initialize canvas and load annotations when PDF is selected
  useEffect(() => {
    if (selectedPdf && isAnnotationMode && canvasRef.current) {
      const canvas = canvasRef.current;
      const container = pdfContainerRef.current;

      if (container) {
        // Use setTimeout to ensure iframe is rendered
        setTimeout(() => {
          const rect = container.getBoundingClientRect();
          canvas.width = rect.width;
          canvas.height = rect.height;
          canvas.style.width = `${rect.width}px`;
          canvas.style.height = `${rect.height}px`;

          // Load existing annotations for the current page
          drawSavedAnnotations();
        }, 100);
      }
    }
  }, [selectedPdf, isAnnotationMode, currentPage, zoom]);

  // Handle PDF selection
  const openPdf = async (pdf) => {
    setIsLoading(true);
    setSelectedPdf(pdf);
    setCurrentPage(1);
    setTotalPages(1);

    // Load annotations from server
    try {
      const response = await fetch(`${backendApi}/api/resumes/${pdf._id}/annotations`);
      if (response.ok) {
        const data = await response.json();
        setAnnotations(data.annotations || {});
      } else {
        // Fallback to local annotations if server request fails
        setAnnotations(pdf.annotations || {});
      }
    } catch (error) {
      console.error("Failed to load annotations:", error);
      setAnnotations(pdf.annotations || {});
    }

    // Reset annotation history
    setAnnotationHistory([]);
    setHistoryIndex(-1);

    // Better loading state management
    setTimeout(() => setIsLoading(false), 1500);
  };

  // Handle page navigation (for multi-page PDFs)
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
      setAnnotationTool('pen');
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
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = penSize * 3;
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

    setCurrentPath(prev => [...prev, { x, y }]);

    const ctx = canvas.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;

    setIsDrawing(false);

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

    drawStickyNote(note);

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

    ctx.fillStyle = 'rgba(255, 255, 0, 0.7)';
    ctx.fillRect(note.x, note.y, 150, 100);

    ctx.fillStyle = '#000';
    ctx.font = '14px Arial';

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

        if (y > note.y + 90) break;
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
        if (path[0].tool === 'note') {
          drawStickyNote(path[0]);
          return;
        }

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
    // Only proceed if we're using the eraser tool AND currently drawing
    if (annotationTool !== 'eraser' || !isDrawing) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const pageKey = `page-${currentPage}`;
    const pageAnnotations = annotations[pageKey] || [];

    const eraserSize = 20;
    let pathsToRemove = [];

    pageAnnotations.forEach((path, pathIndex) => {
      if (path.length > 0 && path[0].tool === 'note') {
        const note = path[0];
        if (x >= note.x && x <= note.x + 150 && y >= note.y && y <= note.y + 100) {
          pathsToRemove.push(pathIndex);
        }
        return;
      }

      for (let i = 1; i < path.length; i++) {
        const dx = path[i].x - path[i - 1].x;
        const dy = path[i].y - path[i - 1].y;
        const len = Math.sqrt(dx * dx + dy * dy);

        if (len === 0) continue;

        const closestT = ((x - path[i - 1].x) * dx + (y - path[i - 1].y) * dy) / (len * len);
        const clampedT = Math.max(0, Math.min(1, closestT));

        const closestX = path[i - 1].x + clampedT * dx;
        const closestY = path[i - 1].y + clampedT * dy;

        const distance = Math.sqrt((x - closestX) * (x - closestX) + (y - closestY) * (y - closestY));

        if (distance < eraserSize) {
          pathsToRemove.push(pathIndex);
          break;
        }
      }
    });

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
  return (
    <section className="relative z-10">

      <div className="flex bg-gray-900 text-gray-100">
        <div className="w-full h-full flex overflow-hidden rounded-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/20">
          {/* Sidebar */}
          {sidebarOpen && (
            <div className="w-64 border-r border-cyan-800/50 p-4 overflow-y-auto bg-gray-800/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-cyan-300">My Resumes</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className=" text-cyan-400 hover:text-cyan-300"
                >
                  <X size={20} />
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              {isLoading && pdfs.length === 0 ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-pulse text-cyan-400">Loading documents...</div>
                </div>
              ) : (
                <ul className="space-y-4">
                  {pdfs.map((pdf) => (
                    <li
                      key={pdf._id}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${selectedPdf?._id === pdf._id
                        ? "bg-cyan-900/30 border border-cyan-500/50 shadow-md shadow-cyan-500/20"
                        : "hover:bg-gray-800/40 border border-transparent"
                        }`}
                      onClick={() => openPdf(pdf)}
                    >
                      <div className="flex items-center space-x-3">
                        <FileText size={20} className="text-cyan-400" />
                        <div className="flex-1">
                          <span className={`block ${selectedPdf?._id === pdf._id ? "text-cyan-300 font-medium" : ""}`}>
                            {pdf.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(pdf.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* PDF Viewer */}
          <div className="flex-1 flex flex-col bg-gray-900/50 backdrop-blur-md overflow-hidden">
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
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-md hover:bg-gray-700/50 text-cyan-400"
                      >
                        <Download size={20} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Annotation Toolbar */}
                <div className="bg-black/60 backdrop-blur-md border-b border-cyan-800/50 p-2 flex items-center">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleAnnotationMode}
                      className={`p-1 rounded-md hover:bg-gray-700/50 ${isAnnotationMode ? 'bg-cyan-900/70 text-cyan-300' : 'text-cyan-400'
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
                            className={`p-1 rounded-md hover:bg-gray-700/50 ${annotationTool === 'pen' ? 'bg-cyan-900/70 text-cyan-300' : 'text-cyan-400'
                              }`}
                          >
                            <Pen size={16} />
                          </button>

                          <button
                            onClick={() => selectAnnotationTool('highlighter')}
                            className={`p-1 rounded-md hover:bg-gray-700/50 ${annotationTool === 'highlighter' ? 'bg-cyan-900/70 text-cyan-300' : 'text-cyan-400'
                              }`}
                          >
                            <Highlighter size={16} />
                          </button>

                          <button
                            onClick={() => selectAnnotationTool('note')}
                            className={`p-1 rounded-md hover:bg-gray-700/50 ${annotationTool === 'note' ? 'bg-cyan-900/70 text-cyan-300' : 'text-cyan-400'
                              }`}
                          >
                            <StickyNote size={16} />
                          </button>

                          <button
                            onClick={() => selectAnnotationTool('eraser')}
                            className={`p-1 rounded-md hover:bg-gray-700/50 ${annotationTool === 'eraser' ? 'bg-cyan-900/70 text-cyan-300' : 'text-cyan-400'
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
                              className={`w-4 h-4 rounded-full ${penColor === color ? 'ring-2 ring-white' : ''
                                }`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>

                        {/* Pen Size */}
                        <div className="flex items-center space-x-1 border-l pl-2 border-cyan-800/50">
                          <button
                            onClick={() => setPenSize(1)}
                            className={`p-1 rounded-md hover:bg-gray-700/50 ${penSize === 1 ? 'bg-cyan-900/70 text-cyan-300' : 'text-cyan-400'
                              }`}
                          >
                            <div className="w-1 h-1 bg-current rounded-full mx-auto" />
                          </button>

                          <button
                            onClick={() => setPenSize(2)}
                            className={`p-1 rounded-md hover:bg-gray-700/50 ${penSize === 2 ? 'bg-cyan-900/70 text-cyan-300' : 'text-cyan-400'
                              }`}
                          >
                            <div className="w-2 h-2 bg-current rounded-full mx-auto" />
                          </button>

                          <button
                            onClick={() => setPenSize(4)}
                            className={`p-1 rounded-md hover:bg-gray-700/50 ${penSize === 4 ? 'bg-cyan-900/70 text-cyan-300' : 'text-cyan-400'
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

                <div className="flex-1 overflow-auto p-4 flex justify-center bg-gradient-to-b from-gray-900/70 to-black/70">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p className="text-cyan-400">Loading PDF...</p>
                    </div>
                  ) : (
                    <div
                      ref={pdfContainerRef}
                      className="relative bg-white shadow-lg shadow-cyan-500/20 transition-all"
                      style={{
                        width: `${zoom}%`,
                        maxWidth: zoom > 100 ? 'none' : '800px',
                        height: '1000px'
                      }}
                      onClick={annotationTool === 'note' ? addStickyNote : undefined}
                    >
                      {/* Embedded PDF */}
                      <iframe
                        src={convertToEmbedUrl(selectedPdf.url)}
                        className="w-full h-full border-0"
                        title={selectedPdf.name}
                        onLoad={() => setIsLoading(false)}
                        onError={() => {
                          setError('Failed to load PDF. Please try again.');
                          setIsLoading(false);
                        }}
                      />


                      {/* Canvas overlay for annotations */}
                      {isAnnotationMode && (
                        <canvas
                          ref={canvasRef}
                          className=" inset-0 z-10 cursor-crosshair"
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
    </section>
  )
}