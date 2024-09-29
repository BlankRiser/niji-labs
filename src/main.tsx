import '@fontsource/geist-mono';
import '@fontsource/geist-sans';
import '@fontsource/sansita';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import './styles/index.css';

createRoot( document.getElementById( "root" )! ).render(
	<StrictMode>
		<App />
	</StrictMode>,
)