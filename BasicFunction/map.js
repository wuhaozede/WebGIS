mapboxgl.accessToken = 'pk.eyJ1IjoibWlhb2NodW5odWFpeGlhIiwiYSI6ImNrd3UwZ2g3cjFqb2Eycm8wM3ZyeGE2aDIifQ.VN_iWJQPbZYL21af_9gtpA';
map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [116.4039, 39.914914],
    maxZoom: 16,
    minZoom: 6,
    zoom: 9.68
});

function menu_click(e) {
    if (e == 1) {
        map.remove();
        var a = document.getElementById("mapoverlay");
        a.style.display = "none";
        var a = document.getElementById("mapoverlay2");
        a.style.display = "none";

        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [115.4039, 38.914914],
            maxZoom: 16,
            minZoom: 6,
            zoom: 9.68
        });
    }
    else if (e == 2) {

        map.remove();
        var a = document.getElementById("mapoverlay");
        a.style.display = "none";
        var a = document.getElementById("mapoverlay2");
        a.style.display = "none";


        mapboxgl.accessToken = 'pk.eyJ1IjoibWlhb2NodW5odWFpeGlhIiwiYSI6ImNrd3UwZ2g3cjFqb2Eycm8wM3ZyeGE2aDIifQ.VN_iWJQPbZYL21af_9gtpA';
        // Create a new map.
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-100.04, 38.907],
            zoom: 3
        });

        map.on('load', () => {
            // Add a source for the state polygons.
            map.addSource('states', {
                'type': 'geojson',
                'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/ne_110m_admin_1_states_provinces_shp.geojson'
            });

            // Add a layer showing the state polygons.
            map.addLayer({
                'id': 'states-layer',
                'type': 'fill',
                'source': 'states',
                'paint': {
                    'fill-color': 'rgba(200, 100, 240, 0.4)',
                    'fill-outline-color': 'rgba(200, 100, 240, 1)'
                }
            });

            // When a click event occurs on a feature in the states layer,
            // open a popup at the location of the click, with description
            // HTML from the click event's properties.
            map.on('click', 'states-layer', (e) => {
                new mapboxgl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(e.features[0].properties.name)
                    .addTo(map);
            });

            // Change the cursor to a pointer when
            // the mouse is over the states layer.
            map.on('mouseenter', 'states-layer', () => {
                map.getCanvas().style.cursor = 'pointer';
            });

            // Change the cursor back to a pointer
            // when it leaves the states layer.
            map.on('mouseleave', 'states-layer', () => {
                map.getCanvas().style.cursor = '';
            });
        });
    }

    else if (e == 3) {

        map.remove();
        var a = document.getElementById("mapoverlay");
        a.style.display = "none";
        var a = document.getElementById("mapoverlay2");
        a.style.display = "none";


        document.getElementById("help-box").style.display = "inline-block";

        map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/satellite-v9', // style URL
            center: [-91.874, 42.76], // starting position [lng, lat]
            zoom: 12 // starting zoom
        });

        const draw = new MapboxDraw({
            displayControlsDefault: false,
            // Select which mapbox-gl-draw control buttons to add to the map.
            controls: {
                polygon: true,
                trash: true
            },
            // Set mapbox-gl-draw to draw by default.
            // The user does not have to click the polygon control button first.
            defaultMode: 'draw_polygon'
        });
        map.addControl(draw);

        map.on('draw.create', updateArea);
        map.on('draw.delete', updateArea);
        map.on('draw.update', updateArea);

        function updateArea(e) {
            const data = draw.getAll();
            const answer = document.getElementById('calculated-area');
            if (data.features.length > 0) {
                const area = turf.area(data);
                // Restrict the area to 2 decimal points.
                const rounded_area = Math.round(area * 100) / 100;
                answer.innerHTML = `<p><strong>${rounded_area}</strong></p><p>square meters</p>`;
            } else {
                answer.innerHTML = '';
                if (e.type !== 'draw.delete')
                    alert('Click the map to draw a polygon.');
            }
        }
    }

    else if(e==4){

        map.remove();
        var a = document.getElementById("mapoverlay");
        a.style.display = "none";
        var a = document.getElementById("mapoverlay2");
        a.style.display = "none";


        mapboxgl.accessToken = 'pk.eyJ1IjoibWlhb2NodW5odWFpeGlhIiwiYSI6ImNrd3UwZ2g3cjFqb2Eycm8wM3ZyeGE2aDIifQ.VN_iWJQPbZYL21af_9gtpA';
        map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        zoom: 18,
        center: [148.9819, -35.3981],
        pitch: 60,
        antialias: true // create the gl context with MSAA antialiasing, so custom layers are antialiased
        });
        
        // parameters to ensure the model is georeferenced correctly on the map
        const modelOrigin = [148.9819, -35.39847];
        const modelAltitude = 0;
        const modelRotate = [Math.PI / 2, 0, 0];
        
        const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
        modelOrigin,
        modelAltitude
        );
        
        // transformation parameters to position, rotate and scale the 3D model onto the map
        const modelTransform = {
        translateX: modelAsMercatorCoordinate.x,
        translateY: modelAsMercatorCoordinate.y,
        translateZ: modelAsMercatorCoordinate.z,
        rotateX: modelRotate[0],
        rotateY: modelRotate[1],
        rotateZ: modelRotate[2],
        /* Since the 3D model is in real world meters, a scale transform needs to be
        * applied since the CustomLayerInterface expects units in MercatorCoordinates.
        */
        scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
        };
        
        const THREE = window.THREE;
        
        // configuration of the custom layer for a 3D model per the CustomLayerInterface
        const customLayer = {
        id: '3d-model',
        type: 'custom',
        renderingMode: '3d',
        onAdd: function (map, gl) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();
        
        // create two three.js lights to illuminate the model
        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, -70, 100).normalize();
        this.scene.add(directionalLight);
        
        const directionalLight2 = new THREE.DirectionalLight(0xffffff);
        directionalLight2.position.set(0, 70, 100).normalize();
        this.scene.add(directionalLight2);
        
        // use the three.js GLTF loader to add the 3D model to the three.js scene
        const loader = new THREE.GLTFLoader();
        loader.load(
        'https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf',
        (gltf) => {
        this.scene.add(gltf.scene);
        }
        );
        this.map = map;
        
        // use the Mapbox GL JS map canvas for three.js
        this.renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(),
        context: gl,
        antialias: true
        });
        
        this.renderer.autoClear = false;
        },
        render: function (gl, matrix) {
        const rotationX = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(1, 0, 0),
        modelTransform.rotateX
        );
        const rotationY = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 1, 0),
        modelTransform.rotateY
        );
        const rotationZ = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 0, 1),
        modelTransform.rotateZ
        );
        
        const m = new THREE.Matrix4().fromArray(matrix);
        const l = new THREE.Matrix4()
        .makeTranslation(
        modelTransform.translateX,
        modelTransform.translateY,
        modelTransform.translateZ
        )
        .scale(
        new THREE.Vector3(
        modelTransform.scale,
        -modelTransform.scale,
        modelTransform.scale
        )
        )
        .multiply(rotationX)
        .multiply(rotationY)
        .multiply(rotationZ);
        
        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.resetState();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
        }
        };
        
        map.on('style.load', () => {
        map.addLayer(customLayer, 'waterway-label');
        });
    }
    else if(e==5){

        map.remove();
        var a = document.getElementById("mapoverlay");
        a.style.display = "none";
        var a = document.getElementById("mapoverlay2");
        a.style.display = "inline";

        mapboxgl.accessToken = 'pk.eyJ1IjoibWlhb2NodW5odWFpeGlhIiwiYSI6ImNrd3UwZ2g3cjFqb2Eycm8wM3ZyeGE2aDIifQ.VN_iWJQPbZYL21af_9gtpA';
        map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/satellite-streets-v11',
        zoom: 0,
        center: [0, 1],
        projection: {
        name: 'lambertConformalConic',
        center: [0, 30],
        parallels: [30, 30]
        }
        });
        
        const projectionInput = document.getElementById('projection');
        const conicParamInputs =
        document.getElementsByClassName('conic-param-input');
        const lngInput = document.getElementById('lng');
        const lngValue = document.getElementById('lng-value');
        const latInput = document.getElementById('lat');
        const latValue = document.getElementById('lat-value');
        const lat1Input = document.getElementById('lat1');
        const lat1Value = document.getElementById('lat1-value');
        const lat2Input = document.getElementById('lat2');
        const lat2Value = document.getElementById('lat2-value');
        const inputs = [
        [lngInput, lngValue],
        [latInput, latValue],
        [lat1Input, lat1Value],
        [lat2Input, lat2Value]
        ];
        
        projectionInput.addEventListener('change', (e) => {
        const isConic = ['albers', 'lambertConformalConic'].includes(
        e.target.value
        );
        
        // Hide non-conic projection params
        for (const input of conicParamInputs) {
        input.style.display = isConic ? 'block' : 'none';
        }
        
        map.setProjection(e.target.value);
        
        if (isConic) {
        const { center, parallels } = map.getProjection();
        lngInput.value = center[0];
        latInput.value = center[1];
        lat1Input.value = parallels[0];
        lat2Input.value = parallels[1];
        }
        for (const [input, value] of inputs) {
        value.textContent = input.value;
        }
        });
        
        for (const [input, value] of inputs) {
        input.addEventListener('change', (e) => {
        value.textContent = e.target.value;
        map.setProjection({
        name: projectionInput.value,
        center: [Number(lngInput.value), Number(latInput.value)],
        parallels: [Number(lat1Input.value), Number(lat2Input.value)]
        });
        });
        }
    }
    else if(e==6)
    {
        map.remove();
        var a = document.getElementById("mapoverlay");
        a.style.display = "none";
        var a = document.getElementById("mapoverlay2");
        a.style.display = "none";


        mapboxgl.accessToken = 'pk.eyJ1IjoibWlhb2NodW5odWFpeGlhIiwiYSI6ImNrd3UwZ2g3cjFqb2Eycm8wM3ZyeGE2aDIifQ.VN_iWJQPbZYL21af_9gtpA';
        map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/outdoors-v11', // style URL
        center: [11.255, 43.77], // starting position
        zoom: 13 // starting zoom
        });
        
        map.addControl(new mapboxgl.FullscreenControl());
    }
    else if(e==7)
    {

        map.remove()
        var a = document.getElementById("mapoverlay");
        a.style.display = "none";
        var a = document.getElementById("mapoverlay2");
        a.style.display = "none";


        mapboxgl.accessToken = 'pk.eyJ1IjoibWlhb2NodW5odWFpeGlhIiwiYSI6ImNrd3UwZ2g3cjFqb2Eycm8wM3ZyeGE2aDIifQ.VN_iWJQPbZYL21af_9gtpA';
        map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-79.4512, 43.6568],
        zoom: 13
        });
        
        // Add the control to the map.
        map.addControl(
        new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
        })
        );
    }
    else if (e==8){

        map.remove();
        var a = document.getElementById("mapoverlay");
        a.style.display = "none";
        var a = document.getElementById("mapoverlay2");
        a.style.display = "none";


        mapboxgl.accessToken = 'pk.eyJ1IjoibWlhb2NodW5odWFpeGlhIiwiYSI6ImNrd3UwZ2g3cjFqb2Eycm8wM3ZyeGE2aDIifQ.VN_iWJQPbZYL21af_9gtpA';
        map = new mapboxgl.Map({
        container: 'map',
        maxZoom: 5.99,
        minZoom: 4,
        zoom: 5,
        center: [-75.789, 41.874],
        style: 'mapbox://styles/mapbox/dark-v10'
        });
        
        map.on('load', () => {
        map.addSource('radar', {
        'type': 'image',
        'url': 'https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif',
        'coordinates': [
        [-80.425, 46.437],
        [-71.516, 46.437],
        [-71.516, 37.936],
        [-80.425, 37.936]
        ]
        });
        map.addLayer({
        id: 'radar-layer',
        'type': 'raster',
        'source': 'radar',
        'paint': {
        'raster-fade-duration': 0
        }
        });
        });
    }
    else if(e==9){

        map.remove()
        var a = document.getElementById("mapoverlay");
        a.style.display = "none";
        var a = document.getElementById("mapoverlay2");
        a.style.display = "none";

        mapboxgl.accessToken = 'pk.eyJ1IjoibWlhb2NodW5odWFpeGlhIiwiYSI6ImNrd3UwZ2g3cjFqb2Eycm8wM3ZyeGE2aDIifQ.VN_iWJQPbZYL21af_9gtpA';
        const videoStyle = {
        'version': 8,
        'sources': {
        'satellite': {
        'type': 'raster',
        'url': 'mapbox://mapbox.satellite',
        'tileSize': 256
        },
        'video': {
        'type': 'video',
        'urls': [
        'https://static-assets.mapbox.com/mapbox-gl-js/drone.mp4',
        'https://static-assets.mapbox.com/mapbox-gl-js/drone.webm'
        ],
        'coordinates': [
        [-122.51596391201019, 37.56238816766053],
        [-122.51467645168304, 37.56410183312965],
        [-122.51309394836426, 37.563391708549425],
        [-122.51423120498657, 37.56161849366671]
        ]
        }
        },
        'layers': [
        {
        'id': 'background',
        'type': 'background',
        'paint': {
        'background-color': 'rgb(4,7,14)'
        }
        },
        {
        'id': 'satellite',
        'type': 'raster',
        'source': 'satellite'
        },
        {
        'id': 'video',
        'type': 'raster',
        'source': 'video'
        }
        ]
        };
        
        map = new mapboxgl.Map({
        container: 'map',
        minZoom: 14,
        zoom: 17,
        center: [-122.514426, 37.562984],
        bearing: -96,
        style: videoStyle
        });
        
        let playingVideo = true;
        
        map.on('click', () => {
        playingVideo = !playingVideo;
        
        if (playingVideo) {
        map.getSource('video').play();
        } else {
        map.getSource('video').pause();
        }
        });
    }
    else if (e==10){

        map.remove()
        var a = document.getElementById("mapoverlay");
        a.style.display = "none";
        var a = document.getElementById("mapoverlay2");
        a.style.display = "none";

        mapboxgl.accessToken = 'pk.eyJ1IjoibWlhb2NodW5odWFpeGlhIiwiYSI6ImNrd3UwZ2g3cjFqb2Eycm8wM3ZyeGE2aDIifQ.VN_iWJQPbZYL21af_9gtpA';
        map = new mapboxgl.Map({
        style: 'mapbox://styles/mapbox/light-v10',
        center: [-74.0066, 40.7135],
        zoom: 15.5,
        pitch: 45,
        bearing: -17.6,
        container: 'map',
        antialias: true
        });
        
        map.on('load', () => {
        // Insert the layer beneath any symbol layer.
        const layers = map.getStyle().layers;
        const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
        ).id;
        
        // The 'building' layer in the Mapbox Streets
        // vector tileset contains building height data
        // from OpenStreetMap.
        map.addLayer(
        {
        'id': 'add-3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
        'fill-extrusion-color': '#aaa',
        
        // Use an 'interpolate' expression to
        // add a smooth transition effect to
        // the buildings as the user zooms in.
        'fill-extrusion-height': [
        'interpolate',
        ['linear'],
        ['zoom'],
        15,
        0,
        15.05,
        ['get', 'height']
        ],
        'fill-extrusion-base': [
        'interpolate',
        ['linear'],
        ['zoom'],
        15,
        0,
        15.05,
        ['get', 'min_height']
        ],
        'fill-extrusion-opacity': 0.6
        }
        },
        labelLayerId
        );
        });
    }
    else if(e==11)
    {
        map.remove();

        var a = document.getElementById("mapoverlay");
        a.style.display = "inline";
        var a = document.getElementById("mapoverlay2");
        a.style.display = "none";

        mapboxgl.accessToken = 'pk.eyJ1IjoibWlhb2NodW5odWFpeGlhIiwiYSI6ImNrd3UwZ2g3cjFqb2Eycm8wM3ZyeGE2aDIifQ.VN_iWJQPbZYL21af_9gtpA';
        
        map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10', // style URL for Mapbox Light
        center: [12.338, 45.4385],
        zoom: 18
        });
        
        map.on('load', () => {
        // Add a custom layer that uses
        // a vector tileset source.
        map.addLayer({
        id: 'triangles',
        source: {
        type: 'vector',
        url: 'mapbox://examples.ckv9z0wgf5v7c27p7me2mf0l9-9wrve' // custom tileset
        },
        'source-layer': 'triangles',
        type: 'fill'
        });
        });
        
        const swatches = document.getElementById('swatches');
        const layer = document.getElementById('layer');
        const colors = [
        '#ffffcc',
        '#a1dab4',
        '#41b6c4',
        '#2c7fb8',
        '#253494',
        '#fed976',
        '#feb24c',
        '#fd8d3c',
        '#f03b20',
        '#bd0026'
        ];
        
        for (const color of colors) {
        const swatch = document.createElement('button');
        swatch.style.backgroundColor = color;
        swatch.addEventListener('click', () => {
        map.setPaintProperty(layer.value, 'fill-color', color);
        });
        swatches.appendChild(swatch);
        }
    }
}