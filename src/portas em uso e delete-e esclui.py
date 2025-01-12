import psutil
import os

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
    
    return connections

def prompt_user_and_handle_kill(connections):
    while True:
        try:
            # Solicitar uma porta do usuário
            user_port = int(input("\nDigite uma porta do resultado acima para identificar o PID associado: "))
            matching_processes = [conn for conn in connections if conn[0] == user_port]

            if not matching_processes:
                print(f"Nenhum processo encontrado para a porta {user_port}.")
                continue

            # Mostrar o PID associado
            for port, pid, process_name, process_num in matching_processes:
                print(f"Porta: {port}, PID: {pid}, Processo: {process_name}")

            # Perguntar ao usuário se deseja excluir o processo
            user_choice = input(f"Deseja excluir o processo associado ao PID {matching_processes[0][1]}? (s/n): ").strip().lower()
            if user_choice == 's':
                pid_to_kill = matching_processes[0][1]
                os.system(f"tskill {pid_to_kill}")  # Executar o comando tskill
                print(f"Processo com PID {pid_to_kill} excluído com sucesso.")
            else:
                print("Nenhuma ação foi realizada.")
            
            break  # Sair do loop após a interação
        except ValueError:
            print("Entrada inválida. Por favor, insira um número válido para a porta.")
        except Exception as e:
            print(f"Ocorreu um erro: {e}")

if __name__ == "__main__":
    print("Scanning open ports and associated processes...\n")
    connections = get_open_ports_and_processes()
    prompt_user_and_handle_kill(connections)
