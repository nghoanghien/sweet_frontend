import React from 'react';
import { createPortal } from 'react-dom';
import { 
  CreditCard, 
  Eye, 
  EyeOff, 
  Lock as LockIcon, 
  Unlock as UnlockIcon, 
  Calendar, 
  X, 
  FileText, 
  FileIcon 
} from 'lucide-react';

import FilterableAccountTransactionList from "@/components/modules/payment-account/components/FilterableAccountTransactionList";
import { AnimatePresence } from 'framer-motion';

const PaymentAccount = ({
  // Data props
  paymentAccounts,
  hiddenAccountInfo,
  transactionHistoryData,
  
  // State props
  drawerVisible,
  selectedAccountId,
  cardDetailVisible,
  selectedCardDetail,
  
  // Action props
  toggleAccountVisibility,
  toggleAccountStatus,
  openTransactionDrawer,
  closeTransactionDrawer,
  
  // Utility functions
  formatCurrency,
  maskAccountNumber,
  getStatusInfo,
}) => {
  return (
    <>
      {/* Main Content */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              Tài khoản thanh toán
            </h2>
            <p className="text-gray-500 text-sm">
              Quản lý tài khoản thanh toán của bạn
            </p>
          </div>
        </div>
      </div>

      {/* Payment accounts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-10">
        {paymentAccounts.map((account) => (
          <div
            key={account.id}
            className="bg-white backdrop-blur-md rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden account-card group"
          >
            <div
              className={`p-5 ${account.color} relative overflow-hidden group-hover:shadow-lg`}
            >
              {/* Hiệu ứng hover */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 animate-shimmer"></div>

              <div className="flex justify-between items-start relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    {account.icon}
                  </div>
                  <div className="text-white">
                    <h3 className="font-medium text-sm group-hover:text-white/95">
                      Tài khoản {account.id}
                    </h3>
                    <p className="text-xs text-white/80 font-mono tracking-wide group-hover:text-white">
                      {hiddenAccountInfo[account.id] ? (
                        maskAccountNumber(account.accountNumber)
                      ) : (
                        <span className="animate-fadeIn">
                          {account.accountNumber}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  {/* Eye toggle button */}
                  <button
                    onClick={() => toggleAccountVisibility(account.id)}
                    className="rounded-full p-1.5 bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:rotate-12 hover:scale-110"
                    aria-label={
                      hiddenAccountInfo[account.id]
                        ? "Hiển thị thông tin"
                        : "Ẩn thông tin"
                    }
                  >
                    {hiddenAccountInfo[account.id] ? (
                      <EyeOff size={16} className="text-white" />
                    ) : (
                      <Eye size={16} className="text-white" />
                    )}
                  </button>

                  {/* Thay thế nút 3 chấm bằng nút khóa/mở khóa trực tiếp */}
                  {account.status !== "permanent_locked" && (
                    <div className="relative">
                      <button
                        onClick={() =>
                          toggleAccountStatus(
                            account.id,
                            account.status
                          )
                        }
                        className="relative rounded-full p-1.5 bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:rotate-12 hover:scale-110 lock-button"
                        aria-label={
                          account.status === "active"
                            ? "Tạm khóa tài khoản"
                            : "Mở khóa tài khoản"
                        }
                      >
                        {account.status === "active" ? (
                          <LockIcon size={16} className="text-white" />
                        ) : (
                          <UnlockIcon
                            size={16}
                            className="text-white"
                          />
                        )}
                      </button>
                      {/* Tooltip hiển thị khi hover */}
                      <div className="tooltip-lock absolute top-full right-0 mt-2 px-2 py-1 bg-white rounded-lg shadow-lg text-xs font-medium text-gray-800 whitespace-nowrap opacity-0 invisible transition-all duration-300 transform translate-y-2 pointer-events-none z-20">
                        {account.status === "active"
                          ? "Tạm khóa"
                          : "Mở khóa"}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 relative overflow-hidden group-hover:bg-gradient-to-b from-white to-gray-50 transition-all duration-500">
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer-effect opacity-0 group-hover:opacity-100"></div>

              {/* Key information in the footer */}
              <div className="flex items-center justify-between mb-3 relative z-10">
                <div className="flex flex-col">
                  <p className="text-xs text-slate-500 mb-1 group-hover:text-indigo-500 transition-colors duration-300">
                    Số dư
                  </p>
                  <p className="text-base font-semibold text-slate-800 transition-all duration-300 font-mono">
                    {hiddenAccountInfo[account.id] ? (
                      <span className="text-slate-400">••••••••</span>
                    ) : (
                      <span className="animate-fadeIn">
                        {formatCurrency(account.balance)}
                      </span>
                    )}
                  </p>
                </div>

                <div
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    getStatusInfo(account.status).bgColor
                  } ${
                    getStatusInfo(account.status).textColor
                  } transform transition-transform duration-300 group-hover:scale-105`}
                >
                  {getStatusInfo(account.status).icon}
                  {getStatusInfo(account.status).text}
                </div>
              </div>

              {/* Bottom date info */}
              <div className="border-t border-slate-100 pt-3 flex justify-between items-center relative z-10">
                <div className="flex items-center space-x-1 text-xs text-slate-500">
                  <Calendar
                    size={12}
                    className="text-slate-400 group-hover:text-slate-500 transition-colors duration-300"
                  />
                  <span className="group-hover:text-slate-600 transition-colors duration-300">
                    {account.creationDate}
                  </span>
                </div>
                <button
                  onClick={() => openTransactionDrawer(account.id)}
                  className={`${account.color} text-white text-xs font-medium px-4 py-1.5 rounded-full hover:shadow-md transition-all duration-300 transform group-hover:scale-105 hover:translate-y-[-2px]`}
                >
                  Chi tiết
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Transaction History Drawer - Using Portal */}
      {drawerVisible && createPortal(
        <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          drawerVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeTransactionDrawer}
      >
        <div
          className={`fixed top-0 bottom-0 right-0 w-full sm:w-96 md:w-[500px] bg-white shadow-2xl transition-transform duration-500 transform ${
            drawerVisible ? "translate-x-0" : "translate-x-full"
          } rounded-l-3xl overflow-hidden z-[61]`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {selectedAccountId && (
            <>
              {/* Drawer Header */}
              <div className="p-5 bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-500 text-white relative overflow-hidden">
                <button
                  onClick={closeTransactionDrawer}
                  className="absolute left-5 top-5 rounded-full h-8 w-8 flex items-center justify-center bg-white/20 hover:bg-white/30 transition-all duration-200"
                >
                  <X size={18} className="text-white" />
                </button>

                <div className="text-center pt-2">
                  <h3 className="text-xl font-medium">Lịch sử giao dịch</h3>
                  <p className="text-white/80 text-sm mt-1">
                    {
                      paymentAccounts.find(
                        (acc) => acc.id === selectedAccountId
                      )?.accountNumber
                    }
                  </p>
                </div>
              </div>

              {/* Transaction List with staggered animations */}
              <div className="overflow-y-auto mb-8 h-full">
                <div className="p-4">
                  <FilterableAccountTransactionList
                    transactions={transactionHistoryData[selectedAccountId]}
                    emptyMessage="Không có giao dịch nào cho tài khoản này"
                    emptyIcon={<FileText size={48} className="text-gray-400" />}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>,
        document.body
      )}

      {/* Chi tiết thẻ tài khoản ở giữa màn hình - Using Portal */}
      {cardDetailVisible && createPortal(
        <div
        className={`fixed inset-0 z-[60] pointer-events-none hidden md:flex items-center justify-center transition-opacity duration-300 ${
          cardDetailVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`w-full max-w-3xl transition-all duration-500 transform ${
            cardDetailVisible
              ? "translate-y-0 scale-100"
              : "translate-y-8 scale-95"
          } ${drawerVisible ? "mr-[500px] sm:mr-96" : "mr-0"}`}
          style={{
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            pointerEvents: cardDetailVisible ? "auto" : "none",
          }}
        >
          {selectedCardDetail && (
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden card-detail-animate mx-4">
              {/* Header với màu gradient của tài khoản */}
              <div
                className={`p-6 ${selectedCardDetail.color} relative overflow-hidden`}
              >
                {/* Background effects */}
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10 backdrop-blur-md"></div>
                <div className="absolute -left-4 -bottom-4 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md"></div>

                <div className="relative flex items-start justify-between z-10">
                  <div className="flex items-center">
                    <div className="h-16 w-16 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                      <CreditCard size={30} className="text-white" />
                    </div>
                    <div className="ml-4 text-white">
                      <h2 className="text-xl font-semibold">
                        Tài khoản {selectedCardDetail.id}
                      </h2>
                      <p className="text-white/80 font-mono mt-1">
                        {hiddenAccountInfo[selectedCardDetail.id]
                          ? maskAccountNumber(selectedCardDetail.accountNumber)
                          : selectedCardDetail.accountNumber}
                      </p>
                      <div
                        className={`inline-flex items-center px-2.5 py-1 mt-2 rounded-full text-xs font-medium ${getStatusInfo(
                          selectedCardDetail.status
                        ).bgColor.replace(
                          "bg-",
                          "bg-opacity-20 bg-"
                        )} text-white`}
                      >
                        {getStatusInfo(selectedCardDetail.status).icon}
                        {getStatusInfo(selectedCardDetail.status).text}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        toggleAccountVisibility(selectedCardDetail.id)
                      }
                      className="rounded-full p-2 bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                    >
                      {hiddenAccountInfo[selectedCardDetail.id] ? (
                        <EyeOff size={18} className="text-white" />
                      ) : (
                        <Eye size={18} className="text-white" />
                      )}
                    </button>

                    {selectedCardDetail.status !== "permanent_locked" && (
                      <button
                        onClick={() =>
                          toggleAccountStatus(selectedCardDetail.id)
                        }
                        className="rounded-full p-2 bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                      >
                        {selectedCardDetail.status === "active" ? (
                          <LockIcon size={18} className="text-white" />
                        ) : (
                          <UnlockIcon size={18} className="text-white" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Thông tin số dư */}
                <div className="mt-6 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                  <p className="text-white/80 text-sm">Số dư hiện tại</p>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    {hiddenAccountInfo[selectedCardDetail.id] ? (
                      <span className="text-white/60">••••••••</span>
                    ) : (
                      formatCurrency(selectedCardDetail.balance)
                    )}
                  </h3>
                </div>
              </div>

              {/* Thông tin chi tiết */}
              <div className="p-6">
                <h3 className="text-gray-800 font-medium mb-4">
                  Thông tin tài khoản
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <p className="text-gray-500 text-xs mb-1">
                      Ngày mở tài khoản
                    </p>
                    <p className="text-gray-800 flex items-center text-sm">
                      <Calendar size={14} className="mr-2 text-indigo-500" />
                      {selectedCardDetail.creationDate}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-xl">
                    <p className="text-gray-500 text-xs mb-1">Loại tài khoản</p>
                    <p className="text-gray-800 flex items-center text-sm">
                      <CreditCard size={14} className="mr-2 text-indigo-500" />
                      Thanh toán
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-xl">
                    <p className="text-gray-500 text-xs mb-1">Trạng thái</p>
                    <p className="flex items-center text-sm">
                      {getStatusInfo(selectedCardDetail.status).icon}
                      <span
                        className={
                          getStatusInfo(selectedCardDetail.status).textColor
                        }
                      >
                        {getStatusInfo(selectedCardDetail.status).text}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Các hành động khác */}
                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                  <button className="bg-amber-50 text-amber-600 px-4 py-2 rounded-xl flex items-center text-sm hover:bg-amber-100 transition-colors">
                    <FileIcon size={16} className="mr-2" />
                    Sao kê
                  </button>
                  <button
                    className="bg-gray-50 text-gray-600 px-4 py-2 rounded-xl flex items-center text-sm hover:bg-gray-100 transition-colors"
                    onClick={closeTransactionDrawer}
                  >
                    <X size={16} className="mr-2" />
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>,
        document.body
      )}

      {/* Add animation keyframes */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(8px);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
            backdrop-filter: blur(8px);
          }
          to {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
        }

        @keyframes scaleIn {
          0% {
            transform: scale(0.92) translateY(10px);
            opacity: 0;
            box-shadow: 0 0 0 rgba(0, 0, 0, 0.1);
          }
          70% {
            transform: scale(1.01);
            opacity: 1;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }
        }

        @keyframes scaleOut {
          0% {
            transform: scale(1);
            opacity: 1;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }
          100% {
            transform: scale(0.92) translateY(10px);
            opacity: 0;
            box-shadow: 0 0 0 rgba(0, 0, 0, 0);
          }
        }

        @keyframes slideInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideOutDown {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(20px);
            opacity: 0;
          }
        }

        @keyframes floatingAnimation {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes rotateBackground {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes fieldAppear {
          0% {
            transform: translateX(-10px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fieldFocusIn {
          0% {
            box-shadow: 0 0 0 rgba(99, 102, 241, 0);
            background-color: rgba(238, 242, 255, 0.3);
          }
          100% {
            box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
            background-color: rgba(238, 242, 255, 0.5);
          }
        }

        @keyframes editModeGlow {
          0% {
            box-shadow: 0 0 0 rgba(99, 102, 241, 0);
          }
          100% {
            box-shadow: 0 0 15px rgba(99, 102, 241, 0.1);
          }
        }

        @keyframes fadeInSlideUp {
          0% {
            opacity: 0;
            transform: translateY(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeSlideIn {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expandIn {
          0% {
            opacity: 0;
            max-height: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            max-height: 500px;
            transform: scale(1);
          }
        }

        /* Field transition effects */
        .field-hidden {
          margin-top: 0 !important;
          margin-bottom: 0 !important;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
          max-height: 0;
        }

        .field-visible {
          max-height: 120px;
          margin-bottom: 1rem;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .edit-mode-entering {
          animation: fieldAppear 0.3s ease-out forwards;
        }

        .animate-field-focus {
          animation: fieldFocusIn 0.5s ease-out forwards;
        }

        /* Staggered animation for multiple fields */
        .profile-section .field-visible {
          transition-delay: calc(var(--index) * 0.05s);
        }

        .edit-mode-active {
          animation: editModeGlow 0.5s ease-out forwards;
          background-color: rgba(249, 250, 255, 0.8);
          /* Ensure content is visible even when scrolled */
          position: relative;
          z-index: 2;
        }

        .animate-fade-in {
          animation: fadeInSlideUp 0.3s ease-out forwards;
        }

        .section-transition {
          /* Remove the animation that causes jerky movement */
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Edit mode state transitions */
        .profile-section.edit-mode-active {
          animation: expandIn 0.4s ease-out forwards;
        }

        .profile-section.edit-mode-active > div {
          animation: fadeSlideIn 0.4s ease-out forwards;
        }

        .modal-enter {
          animation: fadeIn 0.4s ease-out forwards;
        }

        .modal-enter-content {
          animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .modal-exit {
          animation: fadeOut 0.3s ease-out forwards;
        }

        .modal-exit-content {
          animation: scaleOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Elegant scrollbar styles */
        .elegant-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .elegant-scrollbar::-webkit-scrollbar-track {
          background: rgba(226, 232, 240, 0.1);
          margin: 4px;
          border-radius: 10px;
        }

        .elegant-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(79, 70, 229, 0.2);
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: padding-box;
          transition: all 0.3s ease;
        }

        .elegant-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(79, 70, 229, 0.4);
          border: 2px solid transparent;
          background-clip: padding-box;
        }

        /* Pulse animation for scrollbar on load */
        @keyframes scrollPulse {
          0% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 0.2;
          }
        }

        .elegant-scrollbar.has-scroll::-webkit-scrollbar-thumb {
          animation: scrollPulse 2.5s ease-in-out infinite;
        }

        /* Firefox scrollbar styling */
        .elegant-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(79, 70, 229, 0.2) rgba(226, 232, 240, 0.1);
        }

        .elegant-scrollbar:hover {
          scrollbar-color: rgba(79, 70, 229, 0.4) rgba(226, 232, 240, 0.1);
        }

        /* Scroll indicator fade animation */
        @keyframes fadeInOut {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.7;
          }
        }

        .scroll-indicator {
          animation: fadeInOut 2.5s ease-in-out infinite;
        }

        /* Hide scrollbar but allow scrolling */
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }

        /* Responsive modal adjustments */
        @media (max-width: 768px) {
          #profileModalContent {
            max-height: 95vh;
            margin: 0 8px;
            border-radius: 24px;
          }

          .modal-enter-content {
            animation: slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .modal-exit-content {
            animation: slideOutDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          /* Mobile optimizations */
          .custom-scrollbar {
            padding-right: 0;
          }

          /* Adjust spacing for mobile */
          #profileModalContent .p-6 {
            padding: 1rem;
          }

          #profileModalContent .p-5 {
            padding: 1rem;
          }

          #profileModalContent .space-y-4 {
            margin-bottom: 1rem;
          }
        }

        /* Floating animation for decorative elements */
        .floating-element {
          animation: floatingAnimation 3s ease-in-out infinite;
        }

        /* Gradient animation for backgrounds */
        .gradient-animate {
          background-size: 200% 200%;
          animation: rotateBackground 5s ease infinite;
        }

        /* Editable field animation */
        .editable-field-highlight input {
          animation: editableFieldPulse 2s infinite;
        }

        @keyframes editableFieldPulse {
          0% {
            border-color: rgba(79, 70, 229, 0.1);
            box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.2);
          }
          50% {
            border-color: rgba(79, 70, 229, 0.4);
            box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
          }
          100% {
            border-color: rgba(79, 70, 229, 0.1);
            box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.2);
          }
        }

        /* New smooth-transition class */
        .smooth-transition {
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .editable-field-highlight {
          position: relative;
          z-index: 5;
        }

        /* Dropdown customization */
        .appearance-none {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }

        /* Custom dropdown styling */
        select.appearance-none:focus {
          border-color: rgba(99, 102, 241, 0.8);
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }

        select.appearance-none option {
          padding: 8px;
          font-size: 0.875rem;
        }

        /* Dropdown animation */
        @keyframes dropdownReveal {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        select.appearance-none option {
          animation: dropdownReveal 0.2s ease-out forwards;
        }

        /* Add subtle hover effect for dropdown options */
        @media screen and (-webkit-min-device-pixel-ratio: 0) {
          select.appearance-none option:hover {
            background-color: rgba(99, 102, 241, 0.1);
          }
        }

        /* Disabled state styling */
        select:disabled {
          background-color: rgba(243, 244, 246, 0.7);
          cursor: not-allowed;
          color: rgba(107, 114, 128, 0.7);
          border-color: rgba(209, 213, 219, 0.8);
        }

        /* New animation for hiding/showing account information */
        @keyframes blurIn {
          0% {
            filter: blur(0px);
            opacity: 1;
          }
          100% {
            filter: blur(4px);
            opacity: 0.7;
          }
        }

        @keyframes blurOut {
          0% {
            filter: blur(4px);
            opacity: 0.7;
          }
          100% {
            filter: blur(0px);
            opacity: 1;
          }
        }

        /* New shimmer effect animation */
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
          background-size: 200% 100%;
        }

        .shimmer-effect {
          animation: shimmer 2.5s infinite;
        }

        /* Account card hover effects */
        .account-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .account-card:hover {
          transform: translateY(-5px);
        }

        /* Number reveal animation */
        @keyframes numberReveal {
          0% {
            clip-path: inset(0 50% 0 50%);
            opacity: 0;
          }
          100% {
            clip-path: inset(0 0 0 0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: numberReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Detail button hover effect */
        @keyframes buttonPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
          }
          70% {
            box-shadow: 0 0 0 6px rgba(255, 255, 255, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          }
        }

        /* Dropdown animation */
        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeDown {
          animation: fadeDown 0.2s ease-out forwards;
        }

        /* Status transition */
        @keyframes statusPulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        .status-change {
          animation: statusPulse 0.5s ease-in-out;
        }

        /* Custom tooltip styles for lock buttons */
        .lock-button:hover + .tooltip-lock {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .lock-disabled:hover + .tooltip-lock-disabled {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        /* Add delay for smoother experience */
        .tooltip-lock,
        .tooltip-lock-disabled {
          transition: opacity 0.3s ease, visibility 0.3s ease,
            transform 0.3s ease;
        }
      `}</style>

      {/* Add specific styles for drawer animations */}
      <style jsx global>{`
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes slideOutToRight {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100%);
          }
        }

        @keyframes fadeInBlur {
          from {
            opacity: 0;
            backdrop-filter: blur(0);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(4px);
          }
        }

        @keyframes fadeOutBlur {
          from {
            opacity: 1;
            backdrop-filter: blur(4px);
          }
          to {
            opacity: 0;
            backdrop-filter: blur(0);
          }
        }

        /* Drawer animation classes */
        .drawer-enter {
          animation: slideInFromRight 0.3s ease-out forwards;
        }

        .drawer-exit {
          animation: slideOutToRight 0.3s ease-out forwards;
        }

        .drawer-backdrop-enter {
          animation: fadeInBlur 0.3s ease-out forwards;
        }

        .drawer-backdrop-exit {
          animation: fadeOutBlur 0.3s ease-out forwards;
        }

        /* Card detail animations */
        @keyframes cardAppear {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes cardSlideToRight {
          from {
            transform: translateX(0) translateY(0);
          }
          to {
            transform: translateX(-200px) translateY(0);
          }
        }

        @keyframes cardExpandDetail {
          0% {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          100% {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }
        }

        @keyframes detailElementFadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .card-detail-animate {
          animation: cardAppear 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards,
            cardExpandDetail 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .card-detail-animate > div {
          animation: detailElementFadeIn 0.4s ease-out forwards;
        }

        .card-detail-animate > div:nth-child(2) {
          animation-delay: 0.1s;
        }

        /* Staggered animation for buttons */
        .card-detail-animate button {
          animation: detailElementFadeIn 0.3s ease-out forwards;
        }

        .card-detail-animate button:nth-child(1) {
          animation-delay: 0.2s;
        }

        .card-detail-animate button:nth-child(2) {
          animation-delay: 0.3s;
        }

        .card-detail-animate button:nth-child(3) {
          animation-delay: 0.4s;
        }

        .card-detail-animate button:nth-child(4) {
          animation-delay: 0.5s;
        }

        /* Transaction item animations */
        @keyframes fadeInSlideUp {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .transaction-item {
          animation: fadeInSlideUp 0.5s forwards;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0;
        }

        /* Staggered delay for transaction items */
        .transaction-item:nth-child(1) {
          animation-delay: 0.1s;
        }
        .transaction-item:nth-child(2) {
          animation-delay: 0.2s;
        }
        .transaction-item:nth-child(3) {
          animation-delay: 0.3s;
        }
        .transaction-item:nth-child(4) {
          animation-delay: 0.4s;
        }
        .transaction-item:nth-child(5) {
          animation-delay: 0.5s;
        }
        .transaction-item:nth-child(n + 6) {
          animation-delay: 0.6s;
        }

        /* Screen adjustments when the card and drawer are open */
        .main-content-with-detail {
          filter: blur(2px);
          transform: scale(0.98);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }
      `}</style>
    </>
  );
};

export default PaymentAccount;