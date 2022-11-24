import eel, os, os.path, webbrowser, re
user = "Timzzz1"
res, l = ["",""], ""
user_url = "web\\" + user + "\\files"
user_folder = user_url
types_photo = [".png", ".jpg", ".jpeg",".bmp", ".ico", ".webp"]

@eel.expose
def get_input(input):
    global res, user_url, types_photo, user_folder, l
    data = []
    res = input
    if res == "":
        res = ["", "", ""]
    Search = res[1]
    if res[2] != "":
        if res[2] == "home":
            user_folder = user_url
        elif res[2] == "far":
            print(1)
    elif res[0] == "" or res[1] == "":
        if res[0] != "":
            l = res[0]
            if l[:1] == "+":
                user_folder += "\\" + l[1:]
                res[0] = ''
            if l[:1] == "-":
                user_folder = user_folder[:-(len("\\" + res[0][1:]))]
                print(len("\\" + res[0][1:]))
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
                    for g in range(6):
                        file_type = "file"
                        if files[i].rfind(types_photo[g]) > -1:
                            file_type = "image"
                    file_url = (dir + "/" + files[i]).replace("\\", "/")
                    data += [[
                            [file_url[4:]],
                            [files[i]],
                            [os.path.getsize(dir + "\\" + files[i])],
                            [file_type],
                            [""]
                        ]]
            data = [[[l[1:]], [l[1:]], [dir.replace("\\", "/")], ["b_folder"], ["~" + dir[3:]]]] + data
            return data
    else:
        for dir, folder, files in os.walk(user_url):
            for i in range (len(files)):
                document = files[i].lower()
                c = document.find(Search)
                if c != -1:
                    for g in range(6):
                        file_type = "file"
                        if files[i].rfind(types_photo[g]) > -1:
                            file_type = "image"
                    file_url = (dir + "/" + files[i]).replace("\\", "/")
                    data += [[
                        [file_url[4:]],
                        [files[i]],
                        [os.path.getsize(dir + "\\" + files[i])],
                        [file_type],
                        [""]
                    ]]
        return data

eel.init("web")
eel.start("index.html", mode= webbrowser.get('windows-default'))