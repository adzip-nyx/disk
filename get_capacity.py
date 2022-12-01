import psutil, os
user_url = ""
def total_1(input):
    user_ul = input
    usize, sd =0, []
    DISK = "C:"
    free = psutil.disk_usage(DISK)
    sd += [free.total, free.free]
    for dir, folder, files in os.walk(user_url):
        for d in range(len(files)):
            usize += os.path.getsize(dir + "\\" + files[d])
    disk = [{
        "diskCapacity": sd[1], # объем всего диска
        "diskSystem": sd[0], # объем занятого пространства на диске
        "diskUser": usize # объем файлов пользователя
    }]
    usize = 0
    return disk