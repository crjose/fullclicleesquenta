import psutil

def get_open_ports_and_processes():
    connections = []

    # Iterar sobre as conexões ativas no sistema
    for conn in psutil.net_connections(kind='inet'):
        laddr = conn.laddr  # Endereço local (IP e porta)
        pid = conn.pid      # PID associado à conexão

        if laddr and pid:  # Se a conexão possui porta e PID
            port = laddr.port
            try:
                # Tentar obter o processo associado ao PID
                process = psutil.Process(pid)
                process_name = process.name()
                process_num = process.ppid()  # Número do processo pai
            except (psutil.NoSuchProcess, psutil.AccessDenied):
                process_name = "N/A"
                process_num = "N/A"
            
            connections.append((port, pid, process_name, process_num))
    
    # Ordenar conexões por porta e, em caso de empate, por PID
    connections.sort(key=lambda x: (x[0], x[1]))

    # Exibir os resultados ordenados
    print(f"{'Port':<8} {'PID':<8} {'Process Name':<25} {'Process Number':<15}")
    print("-" * 60)
    for port, pid, process_name, process_num in connections:
        print(f"{port:<8} {pid:<8} {process_name:<25} {process_num:<15}")

if __name__ == "__main__":
    print("Scanning open ports and associated processes...\n")
    get_open_ports_and_processes()
