let teams = {
    ordenarTeams(arr) {
        let i, j, aux;
        i = 0;
        var ordenado = false;
        while (i < arr.length && !ordenado) {
            ordenado = true;
            for (j = 0; j < arr.length - i - 1; j++) {
                if (arr[j].points > arr[j + 1].points) {
                    aux = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = aux;
                    ordenado = false; 
                }
            }
            i++;
        }
    }
}
module.exports = teams;