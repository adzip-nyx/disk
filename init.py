import eel, os, os.path, webbrowser
user = open("web\\.username", "r+")
user = user.read()
res, l = ["","", None], ""
user_url = "web\\users\\" + user + "\\files"
user_folder = user_url
types = [[".png", ".jpg", ".jpeg",".bmp", ".ico", ".webp"],[".mkv", ".mp4", ".mov",".avi", ".webm"], [".mp3", ".aac", ".wav", ".flac", "alac", "dsd", "ogg", "flac"]]
name = []

@eel.expose
def get_username():
    global name
    for dir,folder,files in os.walk("web\\users"):
        if dir == "web\\users":
            name += [[user]] + [folder]
        print(name)
    return name

@eel.expose
def get_input(input):
    global res, user_url, types, user_folder, l
    data = []
    res = input
    if res == "":
        res = ["", "", None]
    print(res)
    Search = res[1]
    if res[2] != None:
        if res[2] == "disk":
            user_folder = user_url
        elif res[2] == "fav":
            fav = open(user_url[:-5] + ".fav", "r+")
            fav_file = fav.read()
            print(fav_file[:(fav_file.find("||"))], fav_file[(fav_file.find("||")+2):])
        res = ["", "", None]
    if Search == "":
        print(123)
        if res[0] != "":
            l = res[0]
            if l[:1] == "+":
                user_folder += "\\" + l[1:]
                res[0] = ''
            if l[:1] == "-":
                user_folder = user_folder[:-(len("\\" + res[0][1:]))]
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
        for dir, folder, files in os.walk(user_url):
            for i in range (len(files)):
                file_type = ""
                document = files[i].lower()
                c = document.find(Search)
                if c != -1:
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
        Search = ""
        return data

eel.init("web")
eel.start("index.html", mode= webbrowser.get('windows-default'))