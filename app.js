var app = new Vue({
    el: '#app',
    data: {
      title: 'Vue Flex Grid Tile Map',
      tiles: [],
      tileSize: 128,
      mapWidth: 3,
      mapHeight: 3
    },
    created(){
      this.newMap()
    },
    watch: {
      mapWidth: function (val) {
        this.newMap()
      },
      mapHeight: function (val) {
        this.newMap()
      }
    },
    methods: {
      tileAction(row, col){
        console.log(col, row)
      },
      checkBorder(x, y, x2, y2){
        if(typeof this.tiles[y2] != "undefined"){
          if(typeof this.tiles[y2][x2] != "undefined"){
            if(this.tiles[y][x].type != this.tiles[y2][x2].type){
              return true
            }
          }
        }
        return false
      },
      drawBorders(){
        this.tiles.forEach((row, y)=>{
          row.forEach((tile, x)=>{
            let tileClass = tile.type
            //check top tile
            if(this.checkBorder(x, y, x, y - 1)) {
              tileClass += " borderTop"
            }
            //check right tile
            if(this.checkBorder(x, y, x + 1, y)) {
              tileClass += " borderRight"
            }
            //check bottom tile
            if(this.checkBorder(x, y, x, y + 1)) {
              tileClass += " borderBottom"
            }
            //check left tile
            if(this.checkBorder(x, y, x - 1, y)) {
              tileClass += " borderLeft"
            }
            Vue.set(tile, "class", tileClass)
          })
        })
      },
      newMap(){
        this.tiles = []
        for(let y = 0; y < this.mapHeight; y++) {
          this.tiles[y] = []
          for(let x = 0; x < this.mapWidth; x++) {
            if(Math.random() > 0.25) {
              let icon = ""
              if(Math.random() > 0.50){
                icon = Math.random() > 0.50 ? "fas fa-mountain" : "fas fa-tree"
              }
              this.tiles[y][x] = {type: "plains", class: "plains", icon: icon}
            } else
              this.tiles[y][x] = {type: "water", class: "water", icon: "fas fa-water"}
          }
        }
        this.drawBorders()
      }
    }
  })