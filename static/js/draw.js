(() => {

    window.drawManager = {
        width: null,
        height: null,
        svg: null,
        zoom: null,        
        view: null,
        objects: [],
        init() {
            this.width = $("#graph").width();
            this.height = $("#graph").height();
            console.log(`Width:${this.width} Height:${this.height}`)

            this.svg = d3.select("#graph")
                .attr("width", this.width)
                .attr("height", this.height)

            this.view = this.svg.append("rect")
                .attr("class", "view")
                .attr("x", 0.5)
                .attr("y", 0.5)
                .attr("width", this.width - 1)
                .attr("height", this.height - 1)

            this.zoom = d3.zoom()
                .scaleExtent([0.1, 40])
                // .translateExtent([[-this.width, -this.width], [this.width + 90, this.height + 100]])
                .on("zoom", () => { this.zoomZoomed() });

            this.svg.call(this.zoom);
        },
        appendObject(objType){
            let obj = this.svg.append(objType)
            this.objects.push(obj)
            return obj            
        },
        zoomZoomed() {
            for(let obj of this.objects){
                obj.attr("transform", d3.event.transform);
            }
        },
        zoomResetted() {
            this.svg.transition()
                .duration(750)
                .call(this.zoom.transform, d3.zoomIdentity);
        }

    }

})()