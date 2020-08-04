const Main = imports.ui.main;
const AppDisplay = imports.ui.appDisplay;
const GLib = imports.gi.GLib;

function execute(command)
{
	let [res, out, err] = GLib.spawn_async(
        null,
        ["bash", "-c", command],
        null,
        GLib.SpawnFlags.SEARCH_PATH,
        null,
        null
    );
	return { r: String(res), o: String(out), e: String(err) };
}

function enable()
{
    AppDisplay.AppIconMenu = class MyAppIconMenu extends AppDisplay.AppIconMenu
    {
        _rebuildMenu()
        {
            super._rebuildMenu();
            let menuItem = this._appendMenuItem("Reveal launcher file");
            menuItem.connect('activate', () => {
                let desktopFile = this._source.app.get_app_info().get_filename();
                execute(`nemo "${desktopFile}"`);
            });
        }
    };
}

function disable()
{

}