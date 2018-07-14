// ------------------------------------------------------------
// functions to load/format station data
// ------------------------------------------------------------

// convert xml from api station list to GeoJSON
function getStaGeoJSON() {
      
  // load in ids of uhslc and GCN stations
  var staUH = getUH();
  var staCore = getGlossCore();
  
  // read in xml station list
  var request = new XMLHttpRequest();
  // request.open("GET", "js/stations.xml", false);
  request.open("GET", "https://uhslc.soest.hawaii.edu/station/list/all.xml", false);
  request.send();
  var xml = request.responseXML;
  
  // get station elements
  var sta = xml.getElementsByTagName("station");
  
  // intialize
  var staGeo = {
    "type": "FeatureCollection",
    "features": []
  };
  
  // loop over each station
  for (var k = 0; k < sta.length; k++) {
      
    // extract the station data from the xml dom
    
    s = sta[k];

    var nm = s.getElementsByTagName("name")[0].childNodes[0].nodeValue;
    var cy = s.getElementsByTagName("country")[0].childNodes[0].nodeValue;

    var lat = s.getElementsByTagName("latitude")[0].childNodes[0].nodeValue;
    var latHem = (lat > 0 ? "&deg;N" : "&deg;S");
    var lat_str = Math.abs(lat) + latHem;

    var lon = s.getElementsByTagName("longitude")[0].childNodes[0].nodeValue;
    var lonHem = (lon > 0 ? "&deg;E" : "&deg;W");
    var lon_str = Math.abs(lon) + lonHem;
    
    var uhElem = s.getElementsByTagName("uhslc_id")[0].childNodes;
    if (uhElem.length > 0) {
      var uhID = Number(uhElem[0].nodeValue);
      var isUH = (staUH.indexOf(uhID) !== -1) ? true : false;
    } else { var isUH = false; }
    
    var glossElem = s.getElementsByTagName("gloss_id")[0].childNodes;
    if (glossElem.length > 0) {
      var glossID = Number(glossElem[0].nodeValue);
      var isCore = (staCore.indexOf(glossID) !== -1) ? true : false;
    } else { var glossID = null; var isCore = false; }
    
    var fdd = s.getElementsByTagName("fast_delivery_data")[0];
    var fddOld = fdd.getElementsByTagName("oldest")[0].childNodes;
    var fddNew = fdd.getElementsByTagName("latest")[0].childNodes;
    if (fddOld.length > 0) {
      var fd_latest = fddNew[0].nodeValue;
      var fd_oldest = fddOld[0].nodeValue;
      var hasFD = true;
    } else { 
      var fd_latest = null;
      var fd_oldest = null;
      var hasFD = false; 
    }
    
    var rqd = s.getElementsByTagName("research_quality_data")[0];
    var rqdOld = rqd.getElementsByTagName("oldest")[0].childNodes;
    var rqdNew = rqd.getElementsByTagName("latest")[0].childNodes;
    if (rqdOld.length > 0) {
      var rq_latest = rqdNew[0].nodeValue;
      var rq_oldest = rqdOld[0].nodeValue;
      var hasRQ = true;
    } else { 
      var rq_latest = null;
      var rq_oldest = null;
      var hasRQ = false; 
    }
    
    // enter information into GeoJSON format
    
    staGeo.features[k] = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [ 
          Number(lon),
          Number(lat)
        ] // end coordinates
      }, // close geometry
      "properties": {
        "name": nm,
        "country": cy,
        "uhslc_id": uhID,
        "gloss_id": glossID,
        "latitude_str": lat_str,
        "longitude_str": lon_str,
        "uh_station": isUH,
        "gloss_core": isCore,
        "fast_delivery": { 
          "has": hasFD,
          "oldest": fd_oldest,
          "latest": fd_latest              
        },
        "research_quality": { 
          "has": hasRQ,
          "oldest": rq_oldest,
          "latest": rq_latest              
        }
      } // close properties
    } // close feature
  
  } // end loop
  console.log(staGeo);  
  return staGeo;
  
};

// ------------------------------------------------------------
// lists of uhslc and GCN stations
// ------------------------------------------------------------

function getUH() {
  staUH = [3,
7,
8,
11,
13,
14,
15,
16,
17,
24,
28,
29,
30,
31,
33,
43,
52,
79,
82,
87,
91,
92,
93,
94,
101,
103,
104,
105,
107,
108,
109,
110,
113,
114,
115,
117,
121,
122,
123,
124,
125,
133,
142,
148,
149,
151,
162,
163,
211,
223,
235,
257,
268,
283,
286,
316,
370,
371,
372,
381,
382,
383,
395,
419,
420,
547,
548,
600,
654,
655,
708,
729,
731,
737,
738,
739,
776,
777,
786,
789,
799,
878,
906,
907];
  
  return staUH;
  
}

function getGlossCore() {
  glossCore = [262,	
185,	
192,	
190,	
191,	
181,	
61 ,	
58 ,	
40 ,	
59 ,	
52 ,	
278,	
47 ,	
46 ,	
62 ,	
277,	
54 ,	
53 ,	
148,	
130,	
22 ,	
124,	
51 ,	
55 ,	
56 ,	
57 ,	
308,	
60 ,	
12 ,	
211,	
36 ,	
120,	
194,	
198,	
336,	
3  , 
200,	
193,	
201,	
195,	
334,	
199,	
265,	
350,	
333,	
222,	
224,	
155,	
223,	
156,	
329,	
174,	
189,	
176,	
137,	
178,	
177,	
175,	
94 ,	
79 ,
283,	
247,	
78 ,	
170,	
207,	
171,	
261,	
143,	
139,	
167,	
257,	
214,	
276,	
215,	
228,	
225,	
315,	
344,	
343,	
237,	
2  ,	
169,	
172,	
349,	
1  ,	
182,	
117,	
115,	
116,	
119,	
122,	
242,	
165,	
21 ,	
131,	
96 ,	
338,	
23 ,	
205,	
123,	
142,	
17 ,	
24 ,	
202,	
140,	
138,	
284,	
335,	
255,	
209,	
77 ,	
229,	
32 ,	
34 ,	
281,	
29 ,	
38 ,	
31 ,	
35 ,	
68 ,	
49 ,	
291,	
69 ,	
45 ,	
347,	
292,	
346,	
337,	
330,	
239,	
80 ,	
340,	
210,	
327,	
82 ,	
103,	
88 ,	
326,	
85 ,	
89 ,	
86 ,	
104,	
83 ,	
81 ,	
87 ,	
95 ,	
325,	
324,	
8  ,	
145,	
146,	
113,	
307,	
84 ,	
271,	
15 ,	
293,
27 ,	
28 ,	
111,	
112,	
18 ,	
19 ,	
267,	
161,	
160,	
163,	
213,	
164,	
162,	
212,	
282,	
10 ,	
11 ,	
37 ,	
141,	
314,	
114,	
127,	
129,	
128,	
134,	
101,	
259,	
118,	
322,	
345,	
234,	
321,	
323,	
4  ,	
295,	
30 ,	
168,	
208,	
63 ,	
272,	
331,	
65 ,	
173,	
71 ,	
70 ,	
72 ,	
73 ,	
246,	
244,	
250,	
245,	
206,	
231,	
312,	
97 ,	
25 ,	
274,	
92 ,	
93 ,	
98 ,	
309,	
99 ,	
313,	
90 ,	
260,	
253,	
339,	
44 ,	
66 ,	
6  ,	
7  ,	
13 ,	
20 ,	
76 ,	
268,	
249,	
243,	
251,	
33 ,	
233,	
341,	
9  ,	
297,	
39 ,	
42 ,	
125,	
203,	
121,	
263,	
221,	
26 ,	
266,	
248,	
236,	
241,	
342,	
187,	
264,	
305,	
238,	
302,	
149,	
219,	
289,	
107,	
217,	
287,	
108,	
109,	
216,	
159,	
106,	
290,	
74 ,	
144,	
288,	
151,	
158,	
100,	
150,	
154,	
157,	
102,	
220,	
332,	
105,	
188,	
300,	
348,	
328,	
75 ,	
3];	

  return glossCore;
  
}
