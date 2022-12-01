import os
types = [[".png", ".jpg", ".jpeg",".bmp", ".ico", ".webp"],[".mkv", ".mp4", ".mov",".avi", ".webm"], [".mp3", ".aac", ".wav", ".flac", "alac", "dsd", "ogg", "flac"]]
user_url, sear = "", []
def Searching(input_user):
    global sear
    print("print()")
    text = input_user
    user_url = text[0]
    Search = text[1]
    for dir, folder, files in os.walk(user_url):
        for i in range (len(files)):
            file_type = ""
            c = files[i].lower().find(Search)
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
                sear += [[
                    [file_url[4:]],
                    [files[i]],
                    [os.path.getsize(dir + "\\" + files[i])],
                    [file_type],
                    [""]
                ]]
    return sear