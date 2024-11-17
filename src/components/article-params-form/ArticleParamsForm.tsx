// Компоненты
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from '../../ui/radio-group';
import { Select } from '../../ui/select';
import { Separator } from '../../ui/separator';
import { Text } from '../../ui/text';
// Константы
import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
// Стили
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
// Хуки
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react';
import { useOutsideClickClose } from '../../ui/select/hooks/useOutsideClickClose';

type ArticleStateProps = {
	saveChanges: Dispatch<SetStateAction<ArticleStateType>>;
	// saveChanges обновляет состояние, которое соответствует типу ArticleStateType
};

export const ArticleParamsForm = (props: ArticleStateProps) => {
	const { saveChanges } = props;
	const sideBarRef = useRef(null); //ссылка на Dom-элемент для доступа к его свойствам

	const [isMenuVisible, setIsMenuVisible] = useState(false); //состояние, которое отслеживает открытие меню
	const [articleStyles, setArticleStyles] =
		useState<ArticleStateType>(defaultArticleState); //состояние, которое отслеживает изменения внешнего вида статьи

	// Функция для переключения состояния меню (открыть/закрыть)
	const toggleSideBar = () => {
		setIsMenuVisible((prevState) => !prevState);
	};

	// Функция для изменения выбранных полей в форме
	const updateSelectedOption = (key: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setArticleStyles((prevState) => ({
				...prevState,
				[key]: value,
			}));
		};
	};

	// Хук для закрытия меню при клике вне элемента
	useOutsideClickClose({
		isOpen: isMenuVisible,
		rootRef: sideBarRef,
		onChange: setIsMenuVisible,
	});

	// Функция для обработки события отправки формы
	// и обновления состояния с текущими новыми данными
	const submitFormWithChanges = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		saveChanges(articleStyles);
	};

	// Обработчик для сброса формы и состояния
	const resetForm = () => {
		setArticleStyles(defaultArticleState);
		saveChanges(defaultArticleState);
	};

	// Форма для настройки параметров
	return (
		<div ref={sideBarRef}>
			<ArrowButton onClick={toggleSideBar} open={isMenuVisible} />
			<aside
				className={clsx(
					styles.container,
					isMenuVisible && styles.container_open
				)}>
				<form className={styles.form} onSubmit={submitFormWithChanges}>
					<Text uppercase as='h2' align='left' weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={articleStyles.fontFamilyOption}
						onChange={updateSelectedOption('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={articleStyles.fontSizeOption}
						name='Шрифт'
						onChange={updateSelectedOption('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={articleStyles.fontColor}
						onChange={updateSelectedOption('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={articleStyles.backgroundColor}
						onChange={updateSelectedOption('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={articleStyles.contentWidth}
						onChange={updateSelectedOption('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
