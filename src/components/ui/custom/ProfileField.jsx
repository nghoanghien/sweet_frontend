function ProfileField({ label, value, editable = false, editMode = false, editValue = "", onChange = () => {}, type = "text", options = [], disabled = false }) {
  return (
    <div className={`flex flex-col transition-all duration-500 ease-in-out ${
      editMode && !editable 
        ? 'field-hidden scale-0 h-0 opacity-0 my-0 py-0 overflow-hidden' 
        : editMode && editable 
          ? 'field-visible scale-100 opacity-100 editable-field-highlight' 
          : 'field-visible scale-100 opacity-100'
    }`}>
      <label className={`text-xs mb-1.5 font-medium transition-colors duration-300 ${editMode && editable ? 'text-indigo-600' : 'text-slate-500'}`}>
        {label}
        {editMode && editable && <span className="ml-1 text-indigo-400 font-normal">(chỉnh sửa)</span>}
      </label>
      {editMode && editable ? (
        <div className="relative transform transition-all duration-300 ease-in-out">
          {type === "dropdown" ? (
            <div className="relative">
              <select 
                value={editValue} 
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                className="appearance-none border border-indigo-200 rounded-xl p-2.5 text-sm w-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 bg-white placeholder-slate-400 pr-10"
              >
                <option value="">-- Chọn {label.toLowerCase()} --</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          ) : (
            <>
              <input 
                type="text" 
                value={editValue} 
                onChange={(e) => onChange(e.target.value)}
                className="border border-indigo-200 rounded-xl p-2.5 text-sm w-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 bg-white placeholder-slate-400"
                placeholder={`Nhập ${label.toLowerCase()}`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="text-sm text-slate-800 p-2.5 bg-slate-50/60 rounded-xl border border-slate-100 transform transition-all duration-300 ease-in-out">{value}</div>
      )}
    </div>
  );
}

export default ProfileField;
