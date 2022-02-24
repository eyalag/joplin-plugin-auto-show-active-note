import joplin from 'api';
import { SettingItemType } from 'api/types';

joplin.plugins.register({
	onStart: async function() {
		await joplin.settings.registerSection('autoShowActiveNoteInSideBarSettingsSection', {
			label: 'Auto Show Active Plugin',
		});

		await joplin.settings.registerSettings({
			'autoShowActiveNoteInSideBar': {
				value: true,
				type: SettingItemType.Bool,
				section: 'autoShowActiveNoteInSideBarSettingsSection',
				public: true,
				label: 'Toggle auto show active note in side bar',
			},
		});

		await joplin.workspace.onNoteSelectionChange(async () => {
			const isAutoShowActiveNoteInSideBarEnabled = await joplin.settings.value('autoShowActiveNoteInSideBar');
			if (isAutoShowActiveNoteInSideBarEnabled) {
				await joplin.commands.execute('focusElementSideBar')
			}
		});
	},
});
