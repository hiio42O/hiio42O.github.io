import math

def convert(lon=126.39990833333334,lat=33.251025):
    Re = 6371.00877 # 지도반경
    grid = 5.0 # 격자간격 (km)
    slat1 = 30.0 # 표준위도 1
    slat2 = 60.0 # 표준위도 2
    olon = 126.0 # 기준점 경도
    olat = 38.0 # 기준점 위도
    xo = 210/5.0 # 기준점 X좌표
    yo = 675/5.0 # 기준점 Y좌표
    first = 0
    #define NX 149 /* X축 격자점 수 */
    #define NY 253
    PI = math.pi
    DEGRAD = PI/180.0
    RADDEG = 180.0/PI
    re = Re/grid
    slat1 = slat1 * DEGRAD
    slat2 = slat2 * DEGRAD
    olon = olon * DEGRAD
    olat = olat * DEGRAD

    sn = math.tan(PI*0.25 + slat2*0.5)/math.tan(PI*0.25 + slat1*0.5)
    sn = math.log(math.cos(slat1)/math.cos(slat2))/math.log(sn)
    sf = math.tan(PI*0.25 + slat1*0.5)
    sf = math.pow(sf,sn)*math.cos(slat1)/sn
    ro = math.tan(PI*0.25 + olat*0.5)
    ro = re*sf/math.pow(ro,sn)


    ra = math.tan(PI*0.25+lat*DEGRAD*0.5)
    ra = re*sf/pow(ra,sn)
    theta = lon*DEGRAD - olon
    if theta > PI: 
        theta -= 2.0*PI
    if theta < -PI: 
        theta += 2.0*PI
    theta *= sn
    x = (ra*math.sin(theta)) + xo
    y = (ro - ra*math.cos(theta)) + yo
    return x,y
    
convert()