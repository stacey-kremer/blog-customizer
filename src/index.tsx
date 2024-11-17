import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Создала переменную, в которой будут храниться данные статьи,
	// начальное состояние беру из defaultArticleState
	const [value, setValue] = useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': value.fontFamilyOption.value,
					'--font-size': value.fontSizeOption.value,
					'--font-color': value.fontColor.value,
					'--container-width': value.contentWidth.value,
					'--bg-color': value.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm saveChanges={setValue} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
