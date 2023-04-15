from tkinter import ttk, filedialog, messagebox, END as tkinter_end
from ttkthemes import ThemedTk
from utility.installer.download_from_git import download_from_git
from utility.installer.github_api import github_api_call
from utility.installer.github_api_json import *
from json import load
from utility.file.uncompress_zip import uncompress_zip
from os import remove
from threading import Thread
from utility.file.clear_folder import clear_everything as clear_dir
from utility.text_generator.create_obj import create_obj as create_object
from utility.file.write_json import write_json
from utility.file.read_json import read_json
from utility.installer.change_language import change_toolkit_json as change_toolkit_language
from time import time as current_time
from utility.folder.create_nested import create_nested_folders as check_folder
from utility.text_generator.translator import translator as localization
from utility.windows.notify import send_windows_notification
from utility.darwin.notify import send_macos_notification
from sys import platform


class Render(ThemedTk):

    def __init__(this) -> None:
        super().__init__()
        this.set_theme("arc")
        this.title(localization("tre_launcher"))
        this.geometry("800x600")
        this.style = ttk.Style()
        this.style.configure(
            'TButton',
            borderwidth=0,
            background="#F0F0F0",
            foreground="#000000",
            focuscolor="#F0F0F0",
            lightcolor="#F0F0F0",
            darkcolor="#F0F0F0",
            relief="flat",
            highlightthickness=0,
            font=("Segoe UI", 12),
            padding=(8, 5),
            border=10,
            borderradius=20,
        )
        this.style.map(
            'TButton',
            background=[
                ('', '#F0F0F0')],
            foreground=[('', '#000000'),
                        ],
        )

        this.main_frame = ttk.Frame(this)
        this.main_frame.pack(
            fill="both",
            expand=True,
        )

        this.sidebar = ttk.Frame(
            this.main_frame,
            width=200,
        )

        this.sidebar.grid(
            row=0,
            column=0,
            sticky="ns",
        )

        this.content_frame = ttk.Frame(
            this.main_frame,
            style="Custom.TFrame",
        )

        this.content_frame.grid(
            row=0,
            column=1,
            sticky="nsew",
        )

        this.main_frame.columnconfigure(
            1,
            weight=1,
        )

        this.main_frame.rowconfigure(
            0,
            weight=1,
        )

        this.create_sidebar()
        this.create_content_frames()
        this.show_frame("Installer")

    def create_sidebar(this) -> None:

        header_label = ttk.Label(
            this.sidebar,
            text=localization("tre_launcher"),
            font=(
                "Segoe UI",
                16,
                "bold",
            ),
            style="Custom.TLabel",
        )
        header_label.grid(
            row=0,
            column=0,
            pady=20,
            padx=20,
            sticky="w",
        )

        menu_items = [
            "Installer",
            "Configuration",
            "Settings",
            "About",
        ]

        for index, item in enumerate(menu_items):
            btn = ttk.Button(
                this.sidebar,
                text=item,
                width=20,
                command=lambda item=item: this.show_frame(item),
                style="Custom.TButton",
                takefocus=False,
            )
            btn.grid(
                row=index + 1,
                column=0,
                pady=10,
                padx=20,
            )

    def create_content_frames(this) -> None:

        this.frames = {}

        for item in [
            "Installer",
            "Configuration",
            "Settings",
            "About",
        ]:
            frame = ttk.Frame(
                this.content_frame,
                style="Custom.TFrame",
            )
            this.frames[item] = frame
            frame.grid(
                row=0,
                column=0,
                sticky="nsew",
            )

            label = ttk.Label(
                frame,
                text=item,
                font=(
                    "Segoe UI",
                    16,
                    "bold",
                ),
                style="Custom.TLabel",
            )
            label.pack(
                pady=20,
            )

            if item == "Installer":
                this.create_installer_content(frame)
            elif item == "Configuration":
                this.create_configuration_content(frame)
            elif item == "Settings":
                this.create_settings_content(frame)
            elif item == "About":
                this.create_about_content(frame)

    def create_installer_content(
        this,
        frame,
    ) -> None:

        subframe = ttk.Frame(
            frame,
            style="Custom.TFrame",
        )

        subframe.pack()

        this.progress_bar = ttk.Progressbar(
            subframe,
            mode="determinate",
            length=200,
        )

        this.progress_bar.grid(
            row=5,
            column=1,
            columnspan=3,
            padx=20,
            pady=20,
            sticky="w",
        )

        this.progress_bar.grid_remove()

        try:
            information_json = read_json(
                input_file=f"./settings/information.json",
            )
        except:
            information_json = {
                "version": None,
                "save_directory": None,
                "language": None,
            }

        with (github_api_call(
                "repos",
                "Haruma-VN",
                "Tre",
                "releases",
                "tags",
                "main",
        )) as file:
            github_api_json: GitHub_Api_Json = load(file)

        current_version: str = "null" if information_json.get(
            "version") == None and not type(information_json.get(
                "version")) == str else information_json.get("version")

        language: str = "English" if information_json.get(
            "language") == None and not type(information_json.get(
                "language")) == str else information_json.get("language")

        home_directory: str = "" if information_json.get(
            "save_directory") == None and not type(information_json.get(
                "save_directory")) == str else information_json.get("save_directory")

        new_version: str = github_api_json.get(
            "body") if github_api_json.get("body") != None else "null"

        title = localization("tre_launcher")
        message = f"{localization('new_update_detected')}: {new_version}"

        if (current_version != new_version):
            if platform == "win32":
                send_windows_notification(
                    title,
                    message,
                    f"{home_directory}/extension/appicon/icon.png",
                )
            elif platform == "darwin":
                send_macos_notification(
                    title,
                    message,
                )

        new_version_label = ttk.Label(
            subframe,
            text=localization("new_version")+":",
            style="Custom.TLabel",
        )
        new_version_label.grid(
            row=0,
            column=0,
            padx=(20, 5),
            pady=10,
            sticky="w",
        )

        new_version_entry = ttk.Entry(
            subframe,
            style="Custom.TEntry",
        )

        new_version_entry.grid(
            row=0,
            column=1,
            padx=(5, 20),
            pady=10,
            sticky="w",
        )

        new_version_entry.insert(
            0,
            new_version,
        )

        new_version_entry.configure(
            state="readonly",
        )

        current_version_label = ttk.Label(
            subframe,
            text=localization("current_version")+":",
            style="Custom.TLabel",
        )
        current_version_label.grid(
            row=1,
            column=0,
            padx=(20, 5),
            pady=10, sticky="w",
        )
        current_version_entry = ttk.Entry(
            subframe,
            style="Custom.TEntry",
        )

        current_version_entry.grid(
            row=1,
            column=1,
            padx=(5, 20),
            pady=10,
            sticky="w",
        )

        current_version_entry.insert(
            0,
            current_version,
        )
        current_version_entry.configure(
            state="readonly",
        )

        file_path_label = ttk.Label(
            subframe,
            text=localization("save_path")+":",
            style="Custom.TLabel",
        )

        file_path_label.grid(
            row=2,
            column=0,
            padx=(20, 5),
            pady=10,
            sticky="w",
        )

        file_path_entry = ttk.Entry(
            subframe,
            width=45,
            style="Custom.TEntry",
        )

        file_path_entry.grid(
            row=2,
            column=1,
            padx=(5, 5),
            pady=10,
            sticky="w",
            ipady=5,
        )
        if (home_directory):
            file_path_entry.insert(
                0,
                home_directory,
            )

        def open_folder_dialog() -> None:
            folder_path = filedialog.askdirectory(
                title=localization("tre_installer"))
            file_path_entry.delete(
                0,
                tkinter_end,
            )
            file_path_entry.insert(
                0,
                folder_path,
            )

        file_path_button = ttk.Button(
            subframe,
            text=localization("browse"),
            command=lambda: open_folder_dialog(),
            style="Custom.TButton",
        )

        language_label = ttk.Label(
            subframe,
            text=localization("language")+":",
            style="Custom.TLabel",
        )
        language_label.grid(
            row=3,
            column=0,
            padx=(20, 5),
            pady=10,
            sticky="w",
        )

        language_combobox = ttk.Combobox(
            subframe, values=[
                "English",
                "Chinese",
                "Vietnamese",
            ],
            style="Custom.TCombobox",
        )
        language_combobox.set(language)
        language_combobox.grid(
            row=3,
            column=1,
            padx=(5, 20),
            pady=10,
            sticky="w",
        )

        file_path_button.grid(
            row=2,
            column=2,
            padx=(5, 20),
            pady=10,
            sticky="w",
        )

        def download_tool() -> None:
            def download_thread() -> None:
                this.progress_bar.grid()
                this.progress_bar.start()
                language = language_combobox.get()
                directory_entry_save = file_path_entry.get()
                if not (directory_entry_save):
                    messagebox.showinfo(
                        localization("download_failed"),
                        (localization("not_specify_a_path_to_save_the_tool")),
                    )
                    return
                check_folder(directory_entry_save,
                             )
                clear_dir(
                    directory_entry_save,
                )
                check_folder(
                    path="./settings/",
                )
                start_time: float = current_time()
                write_json(
                    output_dir=f"./settings/information.json",
                    json_obj=create_object(
                        save_directory=directory_entry_save,
                        version=new_version,
                        language=language,
                    ),
                    is_trailing_commas=False,
                )
                download_from_git(
                    f"Tre.zip",
                    "Haruma-VN",
                    "Tre",
                    "releases",
                    "tags",
                    "main",
                )

                this.progress_bar.stop()

                uncompress_zip(
                    f"./Tre.zip",
                    directory_entry_save,
                )

                change_toolkit_language(
                    toolkit_file_path=f"{file_path_entry.get()}/extension/settings/toolkit.json",
                    language=language,
                )

                remove(
                    f"./Tre.zip",
                )

                end_time: float = current_time()
                time_spent: float = "{:.3f}".format(end_time - start_time)

                messagebox.showinfo(
                    localization("download_complete"),
                    localization("download_has_been_completed")+f".\n" +
                    " " + localization("time_spent") + f": {time_spent}s",
                )

                this.progress_bar.grid_remove()

            Thread(
                target=lambda: download_thread()
            ).start()

        download_button = ttk.Button(
            subframe,
            text=localization("download"),
            style="Custom.TButton",
            command=download_tool,
        )

        download_button.grid(
            row=4,
            column=1,
            columnspan=3,
            padx=20,
            pady=20,
            sticky="w",
        )

    def create_configuration_content(
        this,
        frame,
    ) -> None:
        label = ttk.Label(
            frame,
            text="This is the Config frame",
        )
        label.pack(pady=10)

    def create_settings_content(
        this,
        frame
    ) -> None:
        label = ttk.Label(
            frame,
            text="This is the Settings frame",
        )
        label.pack(
            pady=10,
        )

    def create_about_content(
        this,
        frame,
    ) -> None:
        container = ttk.Frame(frame,)
        container.pack(
            expand=True,
            padx=130,
            pady=20,
        )

        program_name = ttk.Label(
            container,
            text=localization("tre_launcher"),
            font=(
                "Segoe UI",
                14,
                "bold",
            ),
        )
        program_name.pack(pady=(
            0,
            10,
        ))

        describe = ttk.Label(
            container,
            text=f"Python & Tkinter",
            font=(
                "Segoe UI",
                14,
                "bold",
            ),
        )
        describe.pack(pady=(
            0,
            10,
        ))

        github_website = ttk.Label(
            container,
            text=f"{(localization('src_code'))}: https://github.com/Haruma-VN/Tre",
            font=(
                "Segoe UI",
                12,
            ),
        )
        github_website.pack(
            pady=(
                0,
                10,
            ))

        platform_info = ttk.Label(
            container,
            text=f"Platform: {platform}",
            font=(
                "Segoe UI",
                12,
            ),
        )
        platform_info.pack(pady=(0, 10))

    def show_frame(
            this,
            frame_name,
    ) -> None:
        for frame in this.frames.values():
            frame.grid_remove()

        frame = this.frames[frame_name]
        frame.grid(
            row=0,
            column=0,
            sticky="nsew",
        )
