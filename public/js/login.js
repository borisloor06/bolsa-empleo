let login = document.getElementById('send')
const estudiante = document.getElementById('estudiante')
const empresa = document.getElementById('empresa')



estudiante.addEventListener('click', regEst)
empresa.addEventListener('click', regEmp)


function regEst(){
    window.location = '/registroEstudiante'
}
function regEmp(){
    window.location = '/registroEmpresa'
}