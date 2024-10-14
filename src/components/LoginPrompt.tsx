import React from 'react';

interface LoginPromptProps {
  onLogin: () => void;
  onClose: () => void;
}

const LoginPrompt: React.FC<LoginPromptProps> = ({ onLogin, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">ログインが必要です</h2>
        <p className="mb-4">この機能を利用するにはログインが必要です。</p>
        <div className="flex justify-end">
          <button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-semibold mr-2"
            onClick={onClose}
          >
            キャンセル
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold"
            onClick={onLogin}
          >
            ログイン
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPrompt;