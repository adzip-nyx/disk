import eel, os, os.path, webbrowser
from get_capacity import *
from Search import *

user = open("web\\.username", "r+")
user = user.read()
res, l = ["",""], ""
user_url = "web\\users\\" + user + "\\files"
user_folder = user_url
types = [[".png", ".jpg", ".jpeg",".bmp", ".ico", ".webp"],[".mkv", ".mp4", ".mov",".avi", ".webm"], [".mp3", ".aac", ".wav", ".flac", "alac", "dsd", "ogg", "flac"]]
name, data, back= [], [], []

@eel.expose
def get_curworkspace():
    workspace = [{
        "currentWorkspace": "disk", # тут надо disk заменить на то что тыкнул, и поменять вкладку
    }]

    return workspace

@eel.expose
def changeworkspace(workspace):
    tool = workspace
    print(4)
    if tool == "disk":
        user_folder = user_url
    elif tool == "fav":
        fav = open(user_url[:-5] + ".fav", "r+")
        fav_files = fav.readlines()
        for fav_file in fav_files:
            dir_fav = fav_file[:(fav_file.find("||"))]
            name_fav = fav_file[(fav_file.find("||")+2):]
            file_url = (dir_fav).replace("\\", "/")
            for g in types[0]:
                if name_fav[name_fav.rfind("."):] == g:
                    file_type = "image"
                    break
            for g in types[1]:
                if name_fav[name_fav.rfind("."):] == g:
                    file_type = "video"
                    break
            for g in types[2]:
                if name_fav[name_fav.rfind("."):] == g:
                    file_type = "audio"
                    break
            if file_type == "":
                file_type = "file"
            data += [[
                            [file_url[4:]],
                            [name_fav],
                            [os.path.getsize(dir_fav)],
                            [file_type],
                            [""]
                        ]]
        back = data
        
    print(user_folder)
    return workspace # сюда присылаю вкладку по которой тыкнул

@eel.expose
def get_capacity():
    global user_url
    reg = total_1(user_url)
    return reg
    

@eel.expose
def get_username():
    global name
    for dir,folder,files in os.walk("web\\users"):
        if dir == "web\\users":
            name += [[user]] + [folder]
    return name

@eel.expose
def get_input(input):
    global res, user_url, types, user_folder, l, data, back
    print(1)
    data = []
    print(back)
    if back != []:
        return back
    print(11)
    res = input
    if res == "":
        res = ["", ""]
    Search = res[1]
    if Search == "":
        if data == []:
            print(123)
            if res[0] != "":
                l = res[0]
                if l[:1] == "+":
                    user_folder += "\\" + l[1:]
                    res[0] = ''
                if l[:1] == "-":
                    user_folder = user_folder[:-(len("\\" + res[0][1:]))]
                    res[0] = ''
                if l[:1] == "*":
                    fav = open(user_url[:-5] + ".fav", "r+")
                    fav.write()
                    res[0] = ''
            for dir, folder, files in os.walk(user_folder):
                if dir == user_folder:
                    for a in range(len(folder)):
                        file_url = (dir + "/" + folder[a]).replace("\\", "/")
                        data += [[
                                [file_url[4:]],
                                [folder[a]],
                                [len(os.listdir(dir + "\\" + folder[a]))],
                                ["folder"],
                                [""]
                            ]]
                    for i in range(len(files)):
                        file_type = ""
                        for g in types[0]:
                            if files[i][files[i].rfind("."):] == g:
                                file_type = "image"
                                break
                        for g in types[1]:
                            if files[i][files[i].rfind("."):] == g:
                                file_type = "video"
                                break
                        for g in types[2]:
                            if files[i][files[i].rfind("."):] == g:
                                file_type = "audio"
                                break
                        if file_type == "":
                            file_type = "file"
                        file_url = (dir + "/" + files[i]).replace("\\", "/")
                        data += [[
                                [file_url[4:]],
                                [files[i]],
                                [os.path.getsize(dir + "\\" + files[i])],
                                [file_type],
                                [""]
                            ]]
                data = [[[l[1:]], [l[1:]], [dir.replace("\\", "/")], ["b_folder"], ["~" + dir[16 + len(user):]], [user]]] + data
                return data
    else:
        input_user = [user_url, Search]
        data = Searching(input_user)
        return data

eel.init("web")
eel.start("index.html", mode= webbrowser.get('windows-default'))